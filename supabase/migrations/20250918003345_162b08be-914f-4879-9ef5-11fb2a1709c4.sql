-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  topic TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES public.profiles(user_id),
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies for articles
CREATE POLICY "Published articles are viewable by everyone" 
ON public.articles 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can manage all articles" 
ON public.articles 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_articles_topic ON public.articles(topic);
CREATE INDEX idx_articles_published ON public.articles(published);
CREATE INDEX idx_articles_slug ON public.articles(slug);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();