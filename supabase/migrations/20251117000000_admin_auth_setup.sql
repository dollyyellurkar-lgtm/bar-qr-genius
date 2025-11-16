-- ==========================================
-- Admin Authentication System Migration
-- Date: November 17, 2025
-- ==========================================

-- Step 1: Ensure user_roles table has proper structure with timestamps
ALTER TABLE public.user_roles
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Step 2: Enable Row Level Security (RLS) on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies for user_roles table

-- Policy: Allow users to view their own role
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
CREATE POLICY "Users can view their own role" ON public.user_roles
FOR SELECT
USING (auth.uid()::text = user_id OR 
       (SELECT role FROM public.user_roles WHERE user_id = auth.uid()::text) = 'admin');

-- Policy: Allow admins to view all roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()::text
    AND role = 'admin'
    AND is_active = TRUE
  )
);

-- Policy: Allow admins to update roles
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles" ON public.user_roles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()::text
    AND role = 'admin'
    AND is_active = TRUE
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()::text
    AND role = 'admin'
    AND is_active = TRUE
  )
);

-- Policy: Allow admins to insert new roles
DROP POLICY IF EXISTS "Admins can insert new roles" ON public.user_roles;
CREATE POLICY "Admins can insert new roles" ON public.user_roles
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()::text
    AND role = 'admin'
    AND is_active = TRUE
  )
);

-- Policy: Allow admins to delete roles
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles" ON public.user_roles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()::text
    AND role = 'admin'
    AND is_active = TRUE
  )
);

-- Step 4: Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = user_id::text
    AND role = 'admin'
    AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create a function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS VARCHAR AS $$
BEGIN
  RETURN (
    SELECT role FROM public.user_roles
    WHERE user_roles.user_id = user_id::text
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commit successful
SELECT 'Admin authentication system migration completed successfully' as migration_status;
