import { useState, useEffect } from 'react';
import { getMenuItems } from '@/lib/storage';
import { MenuItem } from '@/types/menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setItems(getMenuItems());
  }, []);

  const foodItems = items.filter(item => item.category === 'food' && item.available);
  const drinkItems = items.filter(item => item.category === 'drinks' && item.available);

  const drinkSubcategories: { key: string; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'cocktail', label: 'Cocktail' },
    { key: 'mocktail', label: 'Mocktail' },
    { key: 'beer', label: 'Beer' },
    { key: 'wine', label: 'Wine' },
    { key: 'whisky', label: 'Whiskey' },
    { key: 'vodka', label: 'Vodka' },
    { key: 'gin', label: 'Gin' },
    { key: 'rum', label: 'Rum' },
    { key: 'brandy', label: 'Brandy' },
    { key: 'tequila', label: 'Tequila' },
    { key: 'liqueur', label: 'Liqueur' },
    { key: 'imfl', label: 'IMFL' },
    { key: 'shots', label: 'Shots' },
    { key: 'breezers', label: 'Breezers' },
    { key: 'shakes', label: 'Shakes' },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          {item.category === 'food' && (
            <Badge variant="secondary" className="text-lg font-bold">
              ₹{item.price}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {item.category === 'drinks' && (
          <div className="space-y-2">
            {item.sizes?.['30ml'] && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">30ml</span>
                <Badge variant="outline">₹{item.sizes['30ml']}</Badge>
              </div>
            )}
            {item.sizes?.['60ml'] && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">60ml</span>
                <Badge variant="outline">₹{item.sizes['60ml']}</Badge>
              </div>
            )}
            {item.sizes?.['90ml'] && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">90ml</span>
                <Badge variant="outline">₹{item.sizes['90ml']}</Badge>
              </div>
            )}
            {item.sizes?.['180ml'] && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">180ml</span>
                <Badge variant="outline">₹{item.sizes['180ml']}</Badge>
              </div>
            )}
            {item.glassPrice && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Glass</span>
                <Badge variant="outline">₹{item.glassPrice}</Badge>
              </div>
            )}
            {item.bottlePrice && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bottle</span>
                <Badge variant="outline">₹{item.bottlePrice}</Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Our Menu
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="drinks" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="drinks">
              Drinks ({drinkItems.length})
            </TabsTrigger>
            <TabsTrigger value="food">
              Food ({foodItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drinks" className="space-y-8">
            {/* Subcategory filter tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex flex-wrap gap-2 mb-6">
                {drinkSubcategories.map(({ key, label }) => (
                  <TabsTrigger key={key} value={key} className="capitalize">
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {drinkSubcategories.map(({ key }) => {
                const group = key === 'all' ? drinkItems : drinkItems.filter((d) => d.subcategory === key);
                return (
                  <TabsContent key={key} value={key} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.map(renderMenuItem)}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>

          <TabsContent value="food" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodItems.map(renderMenuItem)}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Menu;
