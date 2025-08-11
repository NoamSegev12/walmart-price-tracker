export interface Product {
  product_id: string;
  title: string;
  current_price: number;
  rating: number;
  image_url: string;
  product_url: string;
  category?: string;
  price_history?: number[];
}