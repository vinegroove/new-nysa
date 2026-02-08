-- Add email preference columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN receive_community_events_emails BOOLEAN DEFAULT true,
ADD COLUMN receive_newsletter BOOLEAN DEFAULT true;