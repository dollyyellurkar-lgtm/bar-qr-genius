export interface MenuItem {
  id: string;
  name: string;
  category: 'drinks' | 'food';
  // For drinks, optional subcategory to organize (e.g., beer, whisky, rum, vodka, gin, brandy, wine, imfl)
  subcategory?:
    | 'beer'
    | 'whisky'
    | 'rum'
    | 'vodka'
    | 'gin'
    | 'brandy'
    | 'wine'
    | 'imfl'
    | 'cognac'
    | 'tequila'
    | 'mezcal'
    | 'liqueur'
    | 'shots'
    | 'cocktail'
    | 'mocktail'
    | 'breezers'
    | 'shakes'
    | string;
  price: number;
  image?: string;
  // Optional separate pricing models
  glassPrice?: number; // per-glass price (cocktails, wine by glass)
  bottlePrice?: number; // per-bottle price (e.g., 750ml for spirits/wine)
  sizes?: {
    '30ml'?: number;
    '60ml'?: number;
    '90ml'?: number;
    '180ml'?: number;
  };
  available: boolean;
}
