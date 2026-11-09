export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'clothing' | 'sneakers' | 'bags' | 'beauty';
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  tag?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  inStock: boolean;
  halloweenExclusive?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
