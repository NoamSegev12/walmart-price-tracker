from datetime import datetime

from flask import Flask, request, jsonify
import os
import requests
import urllib.parse
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from server.database import Product

app = Flask(__name__)
token = os.environ['SCRAPEDO_API_TOKEN']
engine = create_engine(os.environ['DB_URL'].replace("postgresql://", "cockroachdb://"), echo=True)


def scrape_walmart_data(target_url):
    url = f'http://api.scrape.do/?token={token}&url={target_url}'
    try:
        response = requests.request("GET", url)
        response.raise_for_status()
        data = response.json()
        app.logger.info(f"Scraped data from {target_url}: {data}")
        return data
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching data from {target_url}: {e}")
        return None


@app.route('/api/search/<name>', methods=['POST'])
def search_by_name(name):
    target_url = urllib.parse.quote(
        f'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=tv')
    products = scrape_walmart_data(target_url)
    return products


@app.route('/api/search/<int:product_id>', methods=['POST'])
def search_by_id(product_id):
    target_url = urllib.parse.quote(f'https://www.walmart.com/ip/{product_id}')
    product_data = scrape_walmart_data(target_url)

    with Session(engine) as session:
        product_title = product_data['title']
        current_price = product_data['price']
        rating = product_data['rating']
        image_url = product_data['image']
        product_url = product_data['product_page_url']
        created_at = datetime.now()
        last_update = datetime.now()
        product = Product(title=product_title, current_price=current_price, rating=rating, image_url=image_url,
                          product_url=product_url, created_at=created_at, last_update=last_update)
        session.add(product)
        session.commit()


@app.route('/api/products')
def get_products():
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


@app.route('/api/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    with Session(engine) as session:
        product = session.get(Product, product_id)
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

@app.route('/api/products/<product_id>/', methods=['POST'])
def add_product():
    new_product = request.json
    if not new_product:
        app.logger.warning("Invalid or missing JSON")
        return jsonify({"error": "Invalid or missing JSON"}), 400
    with Session(engine) as session:
        product = Product(**new_product)
        session.add(product)
        session.commit()
        app.logger.info(f"Added product: {new_product}")
        return product.to_dict()

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
