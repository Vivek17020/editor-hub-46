import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Eye, ArrowRight, Shield, Zap, Users, Globe, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Professional News Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8 leading-tight">
            TheBulletinBriefs
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Your trusted source for <span className="text-primary font-semibold">breaking news</span>, in-depth analysis, and comprehensive coverage of events that shape our world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:bg-gradient-secondary transition-all duration-300 shadow-glow text-lg px-8 py-6 rounded-xl">
              <Link to="/news">
                Explore News
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 rounded-xl">
              <Link to="/admin/login">
                <Shield className="w-5 h-5 mr-2" />
                Admin Access
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Global Coverage</h3>
              <p className="text-muted-foreground text-sm">Real-time news from around the world</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg">Breaking News</h3>
              <p className="text-muted-foreground text-sm">Latest updates as they happen</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Expert Analysis</h3>
              <p className="text-muted-foreground text-sm">In-depth reporting by professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Professional News Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology to deliver news that matters, when it matters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/30 hover:shadow-glow hover:border-primary/30 transition-all duration-500 bg-card/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold">Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced editor with multimedia support, real-time collaboration, and professional formatting tools for compelling storytelling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/30 hover:shadow-glow hover:border-secondary/30 transition-all duration-500 bg-card/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Instant publishing with global CDN distribution. Breaking news reaches your audience in seconds, not minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/30 hover:shadow-glow hover:border-accent/30 transition-all duration-500 bg-card/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold">Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bank-grade security with role-based access control, audit logs, and compliance-ready infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
