-- Drop the security definer view that was flagged as a security risk
DROP VIEW IF EXISTS public.profile_public;

-- The RLS policy "Users can view basic profile info of others" is already in place
-- It allows users to see their own complete profile and authenticated users to see basic info
-- The application will need to handle field-level filtering for sensitive data

-- No additional changes needed - the current policy is secure and functional