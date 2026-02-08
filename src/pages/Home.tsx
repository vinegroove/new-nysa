import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Grape, Users, TreePine, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-vineyard.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide leading-tight">
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Sustainable Restoration
                  </span>
                  <span className="block mt-2 bg-gradient-to-r from-vineyard-gold to-vineyard-gold/80 bg-clip-text text-transparent">
                    Rooted in Earth
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  Experience traditional Commandaria viticulture and be part of a close-to-nature community dedicated to restoration and sustainability.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link to="/learn-more" className="w-full sm:w-auto">
                  <Button size="lg" className="text-lg px-8 py-6 font-medium w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-medium" asChild>
                  <a 
                    href="https://opencollective.com/nysa-earth" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Support Our Mission
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={heroImage} 
                  alt="Vineyard landscape with traditional stone terraces" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-vineyard-gold/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-wide mb-6">
              The <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Nysa</span> Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Named after the mythical place where Dionysus was raised, Nysa 
              combines agricultural restoration, ecological conservation and community building, while preserving 
              and celebrating ancient traditions and creating new memories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TreePine className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-wide mb-4">Restoration & Conservation</h3>
                <p className="text-muted-foreground">
                  Caring for vineyard’s natural balance — managing overgrowth, maintaining terraces, soil and stone walls, and preserving the surrounding ecosystem so the land continues to thrive in harmony with its native life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Grape className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-wide mb-4">Commandaria Heritage</h3>
                <p className="text-muted-foreground">
                  Preserving and celebrating the timeless Commandaria tradition through mindful indigenous vine cultivation and respect for ancient viticulture practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-wide mb-4">Close-to-Nature Community</h3>
                <p className="text-muted-foreground">
                  Enabling a welcoming community where guests, volunteers, and friends connect through hands-on experiences, shared meals, and gatherings that nurture both the earth and human connection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-wide mb-6">
            <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/90 bg-clip-text text-transparent">
              Be Part of the Revival
            </span>
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you volunteer your time, visit our region, or support our projects financially, 
            every contribution directly helps restore and maintain sustainable Commandaria agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn-more" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 w-full">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="primary-outline" className="text-lg px-8 py-6" asChild>
              <a 
                href="https://opencollective.com/nysa-earth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Support Our Work
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
