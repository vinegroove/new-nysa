-- Create events table for community events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type app_role NOT NULL DEFAULT 'community_event',
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  max_attendees INTEGER,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event_attendees table for RSVPs
CREATE TABLE public.event_attendees (
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'attending' CHECK (status IN ('attending', 'not_attending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;

-- Create policies for events (publicly viewable, admin can manage)
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Create policies for event attendees
CREATE POLICY "Users can view event attendees" 
ON public.event_attendees 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own attendance" 
ON public.event_attendees 
FOR ALL 
USING (auth.uid() = user_id);

-- Create trigger for updating events timestamps
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();