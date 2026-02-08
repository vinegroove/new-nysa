import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BeforeAfterComparisonProps {
  beforeImage: {
    src: string;
    alt: string;
    caption: string;
  };
  afterImage: {
    src: string;
    alt: string;
    caption: string;
  };
  className?: string;
}

const BeforeAfterComparison = ({ beforeImage, afterImage, className = "" }: BeforeAfterComparisonProps) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <Card className={`border-border bg-card shadow-[var(--shadow-soft)] overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={showAfter ? afterImage.src : beforeImage.src}
            alt={showAfter ? afterImage.alt : beforeImage.alt}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {showAfter ? "After" : "Before"}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAfter(!showAfter)}
                className="bg-white/90 text-black hover:bg-white transition-colors"
              >
                {showAfter ? "Show Before" : "Show After"}
              </Button>
            </div>
            <p className="text-white text-sm leading-relaxed bg-black/40 backdrop-blur-sm p-3 rounded">
              {showAfter ? afterImage.caption : beforeImage.caption}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeforeAfterComparison;