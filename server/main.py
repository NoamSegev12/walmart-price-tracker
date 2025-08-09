from datetime import datetime

from flask import Flask
import os
import requests
import urllib.parse

from matplotlib.pyplot import title
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from server.database import Product

app = Flask(__name__)
token = os.environ['SCRAPE_DO_TOKEN']
engine = create_engine(os.environ['DB_URL'], echo=True)

def scrape_walmart_data(target_url):
    url = f'http://api.scrape.do/?token={token}&url={target_url}'
    try:
        response = requests.request("GET", url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
        return None

@app.route('/api/search/<name>', methods=['POST'])
def search_by_name(name):
    target_url = urllib.parse.quote(f'https://www.walmart.com/search?q={name}')
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
        return session.query(Product).all()

