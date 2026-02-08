import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grape, Heart, Sprout, Users } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";

const OurStory = () => {
  // Image URLs from Supabase storage
  const getImageUrl = (filename: string) => 
    `https://ydzywcrqbnpvwfllsadq.supabase.co/storage/v1/object/public/our_story_pics/${filename}`;

  // Before/After comparison images
  const vineyardComparison = {
    beforeImage: {
      src: getImageUrl("IMG_20250928_132916_1%20-%20Copy_compressed.jpg"),
      alt: "Overgrown vineyard before restoration",
      caption: "Overgrown vineyard with vegetation blocking access to vines and preventing healthy growth"
    },
    afterImage: {
      src: getImageUrl("IMG_20250928_132948_1 - Copy_compressed.jpg"),
      alt: "Cleared vineyard after restoration",
      caption: "Cleared vineyard with restored access paths and healthy vine maintenance"
    }
  };

  const stoneWallComparison = {
    beforeImage: {
      src: getImageUrl("IMG_20250928_132751_1 - Copy_compressed.jpg"),
      alt: "Stone wall needing restoration",
      caption: "Traditional stone terrace wall showing the effects of time and requiring restoration work"
    },
    afterImage: {
      src: getImageUrl("IMG_20250928_132848_1 - Copy_compressed.jpg"),
      alt: "Stone wall being restored",
      caption: "Partially restored stone terrace wall maintaining traditional craftsmanship techniques"
    }
  };

  // Gallery images for different sections
  const restorationImages = [
    {
      src: getImageUrl("IMG_20250928_133105_1 - Copy_compressed.jpg"),
      alt: "Partially collapsed traditional stone wall",
      caption: "These partially collapsed walls were meant to functionally serve the vineyard health and prevent terrace collapse and soil erosion"
    },
    {
      src: getImageUrl("IMG_20250928_133242_3 - Copy_compressed.jpg"),
      alt: "Stone wall restoration work in progress",
      caption: "Active restoration work maintaining the balance between tradition, functionality, and beauty"
    },
    {
      src: getImageUrl("IMG_20250928_133136_1 - Copy_compressed.jpg"),
      alt: "Partially restored stone wall",
      caption: "Partially restored stone wall, with maintenance these hand-built walls will stand for decades to come"
    }
  ];

  const heritageImages = [
    {
      src: getImageUrl("IMG_20250928_133358_1 - Copy_compressed.jpg"),
      alt: "Vegetation overgrowth and derbis that blocked vineyard pathways",
      caption: "Vegetation overgrowth and derbis that blocked vineyard pathways and covered terrace stone wall"
    },
    {
      src: getImageUrl("IMG_20250928_133535_1 - Copy_compressed.jpg"),
      alt: "Cleared vineyard pathway",
      caption: "Cleared Commandaria vineyard pathway"
    },
    {
      src: getImageUrl("IMG_20250928_133433_1 - Copy_compressed.jpg"),
      alt: "Previously overgrown and collapsed stone wall cleared and rebuilt",
      caption: "Previosuly overgrown pathway and partially collapsed stone wall cleared and rebuilt"
    }
  ];

  const communityImages = [
    {
      src: getImageUrl("IMG_20250928_133603_1 - Copy_compressed.jpg"),
      alt: "Vegetation overgrowth removed from vineyard pathway",
      caption: "Vegetation overgrowth removed from vineyard pathway"
    },
    {
      src: getImageUrl("IMG_20250928_133508_1 - Copy_compressed.jpg"),
      alt: "Overgrown Commandaria vineyard needing restoration",
      caption: "Overgrown Commandaria vineyard needing clearing, soil maintenance and re-cultivation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-wide text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6 pb-4">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nysa.earth is a community-oriented sustainable viticulture restoration and preservation effort with focus on agriculture in harmony with nature.
          </p>
        </section>

        {/* Story Content */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground leading-relaxed mb-8">
              Born from a deep love for the Mediterranean climate and a commitment to sustainable practices, 
              our aim to maintain and restore traditional vineyards in the Commandaria region of Cyprus, both structurally and agriculturally with focus on sustainable and traditional agricultural practices. 
            </p>
            
            {/* Before/After Showcase */}
            <div className="my-12 grid md:grid-cols-2 gap-8">
              <BeforeAfterComparison {...vineyardComparison} />
              <BeforeAfterComparison {...stoneWallComparison} />
            </div>
            
            <p className="text-lg text-foreground leading-relaxed mb-12">
              We are dedicated to preserving traditional knowledge while embracing innovative sustainable approaches to 
              agriculture, more natural building, and more natural existence. Our work centers around supporting resilient 
              ecosystems that support both people and planet.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 grid md:grid-cols-3 gap-8">
          <Card className="border-border bg-card shadow-[var(--shadow-soft)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-foreground leading-relaxed">
                Nysa combines agricultural restoration, ecological conservation and community building, while preserving and celebrating ancient traditions and creating new memories.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-[var(--shadow-soft)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-foreground leading-relaxed">
                A Cyprus Commandaria viticulture that preserves ancient viticulture knowledge and practices, and where every action contributes to the healing 
                and restoration of our shared environment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-[var(--shadow-soft)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-foreground leading-relaxed">
                Sustainability, community, respect for cultural value and locally-practiced agricultural knowledge, sustainable innovation, transparency, and ecological awareness guide every decision we make and every project we undertake.
              </CardDescription>
            </CardContent>
          </Card>
        </section>


                {/* Restoration & Conservation */}
        <section className="py-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8">
            Restoration & Conservation
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Most of the work is already done for us, found in the natural Commandaria terroir and in the actions of our ancestors who cultivated indigenous grape varieties and constructed hand-built stone terraces around the region. Our responsibility is to maintain these natural and harmonious creations by managing overgrowth, re-cultivating for the next generations, maintaining soil health and biodiversity, and restoring the stone walls, which we consider both cultural heritage and agricultural infrastructure.
          </p>
          
          {/* Restoration Images */}
          <ImageGallery images={restorationImages} className="mb-8" columns={3} />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Grape className="h-8 w-8 text-primary" />
          </div>
        </section>

               {/* Commandaria Heritage */}
        <section className="py-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8">
            Commandaria Heritage
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
          We preserve, practice, and celebrate the timeless Commandaria viticulture tradition spanning centuries and enduring through time. While non-wine-producing Commandaria vineyards are often financially challenging, Nysa overcomes this by building community and using a hands-on, collaborative approach.           
          </p>
          
          {/* Heritage Images */}
          <ImageGallery images={heritageImages} className="mb-8" columns={3} />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Grape className="h-8 w-8 text-primary" />
          </div>
        </section>

        {/* Community Approach */}
        <section className="py-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8">
            Building Community
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            We believe that meaningful change happens through collective action. Our community brings together farmers, builders, creators, and enthusiasts who share a common vision of existing more in harmony with nature and restoring and preserving the Commandaria viticulture of Cyprus.
          </p>
          
          {/* Community Images */}
          <ImageGallery images={communityImages} className="mb-8" columns={2} />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Grape className="h-8 w-8 text-primary" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurStory;
