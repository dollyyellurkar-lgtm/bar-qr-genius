import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenuItems, saveMenuItems } from '@/lib/storage';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, QrCode, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin');
    }
    setItems(getMenuItems());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleToggleAvailability = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    setItems(updatedItems);
    saveMenuItems(updatedItems);
    toast.success('Item updated');
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveMenuItems(updatedItems);
    toast.success('Item deleted');
  };

  const handleSaveItem = (item: MenuItem) => {
    let updatedItems;
    if (editingItem) {
      updatedItems = items.map(i => i.id === item.id ? item : i);
      toast.success('Item updated');
    } else {
      updatedItems = [...items, { ...item, id: Date.now().toString() }];
      toast.success('Item added');
    }
    setItems(updatedItems);
    saveMenuItems(updatedItems);
    setEditingItem(null);
    setIsAddDialogOpen(false);
  };

  const menuUrl = `${window.location.origin}/menu`;

  const foodItems = items.filter(item => item.category === 'food');
  const drinkItems = items.filter(item => item.category === 'drinks');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Menu Items</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowQRCode(true)}>
              <QrCode className="mr-2 h-4 w-4" />
              Show QR Code
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            Add, edit, or remove items from your menu
          </p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ItemForm
                item={editingItem}
                onSave={handleSaveItem}
                onCancel={() => {
                  setEditingItem(null);
                  setIsAddDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Items ({items.length})</TabsTrigger>
            <TabsTrigger value="drinks">Drinks ({drinkItems.length})</TabsTrigger>
            <TabsTrigger value="food">Food ({foodItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ItemsTable
              items={items}
              onToggle={handleToggleAvailability}
              onEdit={(item) => {
                setEditingItem(item);
                setIsAddDialogOpen(true);
              }}
              onDelete={handleDeleteItem}
            />
          </TabsContent>

          <TabsContent value="drinks">
            <ItemsTable
              items={drinkItems}
              onToggle={handleToggleAvailability}
              onEdit={(item) => {
                setEditingItem(item);
                setIsAddDialogOpen(true);
              }}
              onDelete={handleDeleteItem}
            />
          </TabsContent>

          <TabsContent value="food">
            <ItemsTable
              items={foodItems}
              onToggle={handleToggleAvailability}
              onEdit={(item) => {
                setEditingItem(item);
                setIsAddDialogOpen(true);
              }}
              onDelete={handleDeleteItem}
            />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Menu QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-4">
            <QRCodeCanvas value={menuUrl} size={256} level="H" />
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to view the menu
            </p>
            <Button
              onClick={() => {
                const canvas = document.querySelector('canvas');
                if (canvas) {
                  const url = canvas.toDataURL();
                  const link = document.createElement('a');
                  link.download = 'menu-qr-code.png';
                  link.href = url;
                  link.click();
                  toast.success('QR code downloaded');
                }
              }}
            >
              Download QR Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ItemsTableProps {
  items: MenuItem[];
  onToggle: (id: string) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

const ItemsTable = ({ items, onToggle, onEdit, onDelete }: ItemsTableProps) => (
  <div className="space-y-2">
    {items.map((item) => (
      <Card key={item.id} className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
              </div>
              <div>
                {item.category === 'food' ? (
                  <p className="font-medium">₹{item.price}</p>
                ) : (
                  <div className="text-sm space-y-1">
                    {item.sizes?.['30ml'] && <p>30ml: ₹{item.sizes['30ml']}</p>}
                    {item.sizes?.['60ml'] && <p>60ml: ₹{item.sizes['60ml']}</p>}
                    {item.sizes?.['90ml'] && <p>90ml: ₹{item.sizes['90ml']}</p>}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.available}
                  onCheckedChange={() => onToggle(item.id)}
                />
                <span className="text-sm text-muted-foreground">
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => onEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => onDelete(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

interface ItemFormProps {
  item: MenuItem | null;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
}

const ItemForm = ({ item, onSave, onCancel }: ItemFormProps) => {
  const [formData, setFormData] = useState<MenuItem>(
    item || {
      id: '',
      name: '',
      category: 'food',
      price: 0,
      available: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value: 'food' | 'drinks') =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="drinks">Drinks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.category === 'food' ? (
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
      ) : (
        <div className="space-y-3">
          <Label>Sizes & Prices (₹)</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="size-30ml" className="w-16">30ml</Label>
              <Input
                id="size-30ml"
                type="number"
                placeholder="Price"
                value={formData.sizes?.['30ml'] || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sizes: { ...formData.sizes, '30ml': Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="size-60ml" className="w-16">60ml</Label>
              <Input
                id="size-60ml"
                type="number"
                placeholder="Price"
                value={formData.sizes?.['60ml'] || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sizes: { ...formData.sizes, '60ml': Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="size-90ml" className="w-16">90ml</Label>
              <Input
                id="size-90ml"
                type="number"
                placeholder="Price"
                value={formData.sizes?.['90ml'] || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sizes: { ...formData.sizes, '90ml': Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="available"
          checked={formData.available}
          onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
        />
        <Label htmlFor="available">Available</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {item ? 'Update' : 'Add'} Item
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminDashboard;
