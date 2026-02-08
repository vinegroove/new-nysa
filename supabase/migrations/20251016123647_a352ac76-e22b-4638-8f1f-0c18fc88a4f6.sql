-- Add receive_volunteering_events_emails column to profiles table
ALTER TABLE public.profiles
ADD COLUMN receive_volunteering_events_emails boolean DEFAULT true;

COMMENT ON COLUMN public.profiles.receive_volunteering_events_emails IS 'User preference for receiving volunteering events notifications';