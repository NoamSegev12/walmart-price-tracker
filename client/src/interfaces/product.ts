export interface Product {
  productId: number;
  title: string;
  currentPrice: number;
  rating: number;
  imageUrl: string;
  productUrl: string;
  category?: string;
  priceHistory?: number[];
}