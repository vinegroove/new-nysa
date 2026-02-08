-- Add restrictive RLS policies to user_roles table to prevent privilege escalation

-- Only admins can insert new role assignments
CREATE POLICY "Only admins can insert role assignments"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update role assignments
CREATE POLICY "Only admins can update role assignments"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete role assignments
CREATE POLICY "Only admins can delete role assignments"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));