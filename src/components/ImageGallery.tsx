import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  className?: string;
  columns?: number;
}

const ImageGallery = ({ images, className = "", columns = 2 }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const gridCols = columns === 4 ? "grid-cols-2 lg:grid-cols-4" : 
                   columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : 
                   "grid-cols-1 md:grid-cols-2";

  return (
    <>
      <div className={`grid ${gridCols} gap-4 ${className}`}>
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div 
                className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {image.caption && (
                  <div className="p-3">
                    <p className="text-sm text-muted-foreground">{image.caption}</p>
                  </div>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-sm">
              <div className="relative">
                <img
                  src={images[selectedImage || index].src}
                  alt={images[selectedImage || index].alt}
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={prevImage}
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={nextImage}
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                {images[selectedImage || index].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-4">
                    <p className="text-foreground text-center">{images[selectedImage || index].caption}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;