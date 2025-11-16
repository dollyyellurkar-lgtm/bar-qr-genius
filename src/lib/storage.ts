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
  {
    id: '4',
    name: 'Mojito',
    category: 'drinks',
    price: 180,
    sizes: {
      '30ml': 180,
      '60ml': 280,
      '90ml': 380,
    },
    available: true,
  },
];
