import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Grape, Home, Leaf, Droplets } from "lucide-react";
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Vineyard Restoration",
      description: "Restoring a traditional vineyard with indigenous Commandaria grape varieties.",
      category: "Agricultural & Structural Restoration",
      status: "Active",
      icon: Grape,
      openCollectiveUrl: "https://opencollective.com/nysa-earth",
      // Replace with actual Open Collective URLs
      tags: ["Viticulture", "Biodynamic", "Heritage"],
      funding: "Find open volunteering events on our Open Collective.",
    },
    {
      id: 2,
      title: "Farming Machinery Fundraiser",
      description: "Raising funds for Nysa.earth tractor with backhoe and frontloader attachments.",
      category: "Fundraising",
      status: "Active",
      icon: Home,
      openCollectiveUrl: "https://opencollective.com/nysa-earth/projects/farming-machinery-fundraiser",
      tags: ["Farming", "Machinery", "Viticulture", "Fundraiser"],
      funding: "Donate to our fundraiser on Open Collective.",
    },
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-primary/10 text-primary border-primary/20";
      case "Planned":
        return "bg-vineyard-gold/10 text-vineyard-gold border-vineyard-gold/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-wide text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6 pb-4">
            Our Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the initiatives driving our community forward. Each project represents a step toward sustainable
            living and regenerative practices.
          </p>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              return (
                <Card
                  key={project.id}
                  className="border-border bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="text-sm font-medium text-primary">{project.funding}</div>
                      <Button className="w-full" asChild>
                        <a href={project.openCollectiveUrl} target="_blank" rel="noopener noreferrer">
                          Support on Open Collective
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every contribution, no matter the size, helps us build a more sustainable future. Support the projects
              that resonate with you and become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://opencollective.com/nysa-earth" target="_blank" rel="noopener noreferrer">
                  View All Projects on Open Collective
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default Projects;
