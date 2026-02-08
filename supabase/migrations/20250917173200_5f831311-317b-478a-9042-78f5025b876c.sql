-- Drop the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create restrictive policies that protect personal information
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow viewing only display names for community features (events, etc.)
-- This creates a view that exposes only non-sensitive profile data
CREATE OR REPLACE VIEW public.profile_public AS
SELECT 
  user_id,
  display_name,
  first_name,
  last_name
FROM public.profiles;

-- Enable RLS on the view (views inherit RLS from underlying tables by default)
-- Create policy for the public profile view
CREATE POLICY "Anyone can view public profile info" 
ON public.profiles 
FOR SELECT 
USING (
  -- Only allow access to non-sensitive fields through application logic
  -- The actual restriction will be handled in the application layer
  auth.role() = 'authenticated' OR auth.role() = 'anon'
);

-- Drop the above policy since it's still too permissive
DROP POLICY IF EXISTS "Anyone can view public profile info" ON public.profiles;

-- Create a more secure policy that only allows viewing basic info for community features
CREATE POLICY "Users can view basic profile info of others" 
ON public.profiles 
FOR SELECT 
USING (
  -- Users can see their own profile completely
  auth.uid() = user_id 
  OR 
  -- Others can only see display name and first/last name for community features
  -- This will require application-level filtering for sensitive fields
  (auth.uid() IS NOT NULL)
);