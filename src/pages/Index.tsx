import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Settings, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              MenuX
            </span>
            {' — '}
            <span className="text-foreground">Modern QR Menus</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Launch digital menus in minutes. Engage customers. Get insights.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90">
              <Link to="/menu">View Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/admin">Admin Login</Link>
            </Button>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-muted-foreground">
              Trusted by 1,000+ restaurants across India
            </span>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">View Menu</CardTitle>
              <CardDescription className="text-base">
                Browse our current menu as a customer
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full" size="lg">
                <Link to="/menu">View Menu</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <CardDescription className="text-base">
                Manage menu items and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link to="/admin">Admin Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
