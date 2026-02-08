-- Fix critical security issue: Remove user INSERT policy for user_roles table
-- Users should not be able to grant themselves roles

-- Drop the dangerous INSERT policy that allows users to insert their own roles
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;

-- Create a secure admin-only function to assign roles
CREATE OR REPLACE FUNCTION public.assign_user_role(_user_id uuid, _role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to assign roles (except for the initial setup)
  IF NOT (public.has_role(auth.uid(), 'admin') OR auth.uid() IS NULL) THEN
    RAISE EXCEPTION 'Only admins can assign user roles';
  END IF;
  
  -- Insert or update the user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Update the handle_new_user function to use the secure role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Assign default member role securely (bypasses admin check for new users)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member');
  
  RETURN NEW;
END;
$$;

-- Create a function to check if current user is admin (for UI purposes)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;