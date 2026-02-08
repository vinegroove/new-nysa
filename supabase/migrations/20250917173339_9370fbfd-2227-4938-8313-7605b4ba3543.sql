-- Drop the current overly permissive policy
DROP POLICY IF EXISTS "Users can view basic profile info of others" ON public.profiles;

-- Create a restrictive policy: users can only see their own complete profile
CREATE POLICY "Users can view their own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a secure function to get public profile info for community features
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_user_id uuid)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  first_name text
) 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return limited public fields for community features
  RETURN QUERY
  SELECT 
    p.user_id,
    p.display_name,
    p.first_name
  FROM public.profiles p
  WHERE p.user_id = profile_user_id;
END;
$$;

-- Grant usage to authenticated users
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO authenticated;