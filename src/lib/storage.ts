import { MenuItem } from '@/types/menu';

const STORAGE_KEY = 'bar_menu_items';

export const getMenuItems = (): MenuItem[] => {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : getSampleData();
  } catch (error) {
    console.error('Error loading menu items:', error);
    return getSampleData();
  }
};

export const saveMenuItems = (items: MenuItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving menu items:', error);
  }
};

const getSampleData = (): MenuItem[] => [
  {
    id: '1',
    name: 'BOMBIL KOLIWADA',
    category: 'food',
    price: 300,
    available: true,
  },
  {
    id: '2',
    name: 'CHEESE BALLS',
    category: 'food',
    price: 200,
    available: true,
  },
  {
    id: '3',
    name: 'CHEESE GARLIC BREAD',
    category: 'food',
    price: 150,
    available: true,
  },
  // Traditional Indian Drinks
  {
    id: '4',
    name: 'Sweet Lassi',
    category: 'drinks',
    price: 80,
    available: true,
  },
  {
    id: '5',
    name: 'Salted Lassi',
    category: 'drinks',
    price: 80,
    available: true,
  },
  {
    id: '6',
    name: 'Mango Lassi',
    category: 'drinks',
    price: 100,
    available: true,
  },
  {
    id: '7',
    name: 'Chaas / Buttermilk',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '8',
    name: 'Nimbu Pani',
    category: 'drinks',
    price: 50,
    available: true,
  },
  {
    id: '9',
    name: 'Jaljeera',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '10',
    name: 'Aam Panna',
    category: 'drinks',
    price: 80,
    available: true,
  },
  {
    id: '11',
    name: 'Thandai',
    category: 'drinks',
    price: 90,
    available: true,
  },
  {
    id: '12',
    name: 'Masala Chai',
    category: 'drinks',
    price: 40,
    available: true,
  },
  {
    id: '13',
    name: 'Cutting Chai',
    category: 'drinks',
    price: 20,
    available: true,
  },
  {
    id: '14',
    name: 'Filter Coffee',
    category: 'drinks',
    price: 50,
    available: true,
  },
  {
    id: '15',
    name: 'Sugarcane Juice',
    category: 'drinks',
    price: 50,
    available: true,
  },
  {
    id: '16',
    name: 'Coconut Water',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '17',
    name: 'Rose Milk',
    category: 'drinks',
    price: 70,
    available: true,
  },
  {
    id: '18',
    name: 'Badam Milk',
    category: 'drinks',
    price: 80,
    available: true,
  },
  {
    id: '19',
    name: 'Shikanji',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '20',
    name: 'Sol Kadhi',
    category: 'drinks',
    price: 70,
    available: true,
  },
  {
    id: '21',
    name: 'Paneer Soda',
    category: 'drinks',
    price: 50,
    available: true,
  },
  {
    id: '22',
    name: 'Jal Jeera Soda',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '23',
    name: 'Kokum Sherbet',
    category: 'drinks',
    price: 80,
    available: true,
  },
  {
    id: '24',
    name: 'Sattu Drink',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '25',
    name: 'Bel Ka Sharbat',
    category: 'drinks',
    price: 70,
    available: true,
  },
  {
    id: '26',
    name: 'Kesar Milk',
    category: 'drinks',
    price: 90,
    available: true,
  },
  {
    id: '27',
    name: 'Masala Milk',
    category: 'drinks',
    price: 80,
    available: true,
  },
  {
    id: '28',
    name: 'Falooda',
    category: 'drinks',
    price: 120,
    available: true,
  },
  {
    id: '29',
    name: 'Kulfi Shake',
    category: 'drinks',
    price: 100,
    available: true,
  },
  {
    id: '30',
    name: 'Gulab Sherbet',
    category: 'drinks',
    price: 70,
    available: true,
  },
  {
    id: '31',
    name: 'Khus Sherbet',
    category: 'drinks',
    price: 70,
    available: true,
  },
  {
    id: '32',
    name: 'Rooh Afza',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '33',
    name: 'Neer Mor',
    category: 'drinks',
    price: 60,
    available: true,
  },
  {
    id: '34',
    name: 'Panakam',
    category: 'drinks',
    price: 50,
    available: true,
  },
  {
    id: '35',
    name: 'Variyali Sherbet',
    category: 'drinks',
    price: 70,
    available: true,
  },
];
