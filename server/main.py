from datetime import datetime
from flask import Flask, request, jsonify
import os
import requests
import urllib.parse
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from server.database import Product, ShoppingCart
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
token = os.environ['SCRAPEDO_API_TOKEN']
engine = create_engine(os.environ['DB_URL'].replace("postgresql://", "cockroachdb://"), echo=True)


def safe_str(val):
    if isinstance(val, (dict, list)):
        return json.dumps(val, ensure_ascii=False)
    return str(val) if val is not None else ""


def parse_walmart_item(item: dict) -> dict:
    return {
        "product_id": safe_str(
            item.get("productId")
            or item.get("usItemId")
            or item.get("id")
        ),
        "title": safe_str(
            item.get("title")
            or item.get("name")
            or (item.get("product", {}) or {}).get("title")
            or (item.get("product", {}) or {}).get("name")
        ),
        "current_price": (
            item.get("price", {}).get("priceDisplay")
            if isinstance(item.get("price"), dict)
            else item.get("price")
        ),
        "rating": item.get("averageRating") or item.get("rating"),
        "image_url": safe_str(
            item.get("image", {}).get("url")
            if isinstance(item.get("image"), dict)
            else item.get("image")
        ),
        "product_url": safe_str(
            f"https://www.walmart.com/ip/{item.get('usItemId') or item.get('productId')}"
            if (item.get("usItemId") or item.get("productId"))
            else None
        ),
        "category": safe_str(
            (item.get("category") or {}).get("name")
            if isinstance(item.get("category"), dict)
            else item.get("categoryPath")
                 or (item.get("product", {}) or {}).get("category")
        )
    }


def parse_walmart_search(html):
    soup = BeautifulSoup(html, "html.parser")
    script_tag = soup.find("script", id="__NEXT_DATA__")
    if not script_tag:
        return []
    data = json.loads(script_tag.string)

    try:
        items = data["props"]["pageProps"]["initialData"]["searchResult"]["itemStacks"][0]["items"]
    except KeyError:
        app.logger.warning("Failed to parse Walmart search results")
        return []

    products = []
    for item in items:
        product = parse_walmart_item(item)
        if not product["product_id"]:
            continue
        products.append(product)
    return products


def scrape_walmart_data(target_url):
    url = f'http://api.scrape.do/?token={token}&url={target_url}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        app.logger.info(f"Scraped data from {target_url}: {response.text}")
        return response.text
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching data from {target_url}: {e}")
        return None


@app.route('/api/search/<name>', methods=['POST'])
def search_by_name(name):
    target_url = urllib.parse.quote(f'https://www.walmart.com/search?q={name}')
    html = scrape_walmart_data(target_url)
    products = parse_walmart_search(html)

    now = datetime.now()
    product_rows = list({
                            p["product_id"]: {
                                "product_id": p["product_id"],
                                "title": p["title"],
                                "current_price": str(p["current_price"]),
                                "rating": p["rating"],
                                "image_url": p["image_url"],
                                "product_url": p["product_url"],
                                "created_at": now,
                                "last_update": now
                            }
                            for p in products
                        }.values())

    stmt = insert(Product).values(product_rows)
    stmt = stmt.on_conflict_do_update(
        index_elements=['product_id'],
        set_={
            "title": stmt.excluded.title,
            "current_price": stmt.excluded.current_price,
            "rating": stmt.excluded.rating,
            "image_url": stmt.excluded.image_url,
            "product_url": stmt.excluded.product_url,
            "last_update": stmt.excluded.last_update
        }
    )

    with Session(engine) as session:
        session.execute(stmt)
        session.commit()

    return jsonify(products)


# @app.route('/api/search/<int:product_id>', methods=['POST'])
# def search_by_id(product_id):
#     target_url = urllib.parse.quote(f'https://www.walmart.com/ip/{product_id}')
#     product_data = scrape_walmart_data(target_url)
#
#     with Session(engine) as session:
#         product_title = product_data['title']
#         current_price = product_data['price']
#         rating = product_data['rating']
#         image_url = product_data['image']
#         product_url = product_data['product_page_url']
#         created_at = datetime.now()
#         last_update = datetime.now()
#         product = Product(title=product_title, current_price=current_price, rating=rating, image_url=image_url,
#                           product_url=product_url, created_at=created_at, last_update=last_update)
#         session.add(product)
#         session.commit()


@app.route('/api/products')
def get_products():
    with Session(engine) as session:
        products = session.query(ShoppingCart).all()
        return [p.to_dict() for p in products]


@app.route('/api/cart')
def get_products_from_cart():
    with Session(engine) as session:
        products = session.query(Product).all()
        return [p.to_dict() for p in products]


@app.route('/api/products/<product_id>')
def get_product(product_id):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            app.logger.warning(f"Product not found: {product_id}")
            return {'error': 'Product not found'}, 404
        return product.to_dict()


@app.route('/api/products/<product_id>', methods=['PUT'])
def update_product(product_id):
    new_data = request.json
    if not new_data:
        app.logger.warning("Invalid or missing JSON")
        return jsonify({"error": "Invalid or missing JSON"}), 400
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            app.logger.warning(f"Product not found: {product_id}")
            return jsonify({'error': 'Product not found'}), 404

        for key, value in new_data.items():
            if hasattr(product, key) and key != 'product_id':
                setattr(product, key, value)

        product.last_update = datetime.now()
        session.commit()
        app.logger.info(f"Updated product {product_id}: {new_data}")
        return product.to_dict()


def delete(table, product_id):
    with Session(engine) as session:
        product = session.get(table, product_id)
        if not product:
            app.logger.warning(f"Product not found: {product_id}")
            return jsonify({'error': 'Product not found'}), 404
        session.delete(product)
        try:
            session.commit()
            app.logger.info(f"Deleted product {product_id}")
            return jsonify({'success': 'Product deleted'}), 200
        except Exception as e:
            session.rollback()
            app.logger.error(f"Error during commit: {e}")
            return jsonify({'error': 'Failed to delete product from database'}), 500


@app.route('/api/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    return delete(Product, product_id)


@app.route('/api/cart/<product_id>', methods=['POST'])
def add_product_to_cart(product_id: str):
    new_product = request.json
    if not new_product:
        app.logger.warning("Invalid or missing JSON")
        return jsonify({"error": "Invalid or missing JSON"}), 400
    with Session(engine) as session:
        product = ShoppingCart(**new_product)
        session.add(product)
        session.commit()
        app.logger.info(f"Added product: {new_product}")
        return product.to_dict()


@app.route('/api/cart/<product_id>', methods=['DELETE'])
def delete_product_from_cart(product_id: str):
    return delete(ShoppingCart, product_id)


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
