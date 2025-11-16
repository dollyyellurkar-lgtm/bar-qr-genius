export interface MenuItem {
  id: string;
  name: string;
  category: 'drinks' | 'food';
  price: number;
  image?: string;
  sizes?: {
    '30ml'?: number;
    '60ml'?: number;
    '90ml'?: number;
  };
  available: boolean;
}
