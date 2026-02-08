-- Create events table for community events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  max_attendees INTEGER,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Everyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create events" 
ON public.events 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events" 
ON public.events 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

-- Create event_attendees table for managing event attendance
CREATE TABLE public.event_attendees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;

-- Create policies for event attendees
CREATE POLICY "Users can view their own attendance" 
ON public.event_attendees 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" 
ON public.event_attendees 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unregister from events" 
ON public.event_attendees 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates on events
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update profiles table to include additional fields for Nysa community
ALTER TABLE public.profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN date_of_birth DATE;