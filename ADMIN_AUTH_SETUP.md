# Admin Authentication System Setup

## Overview

This document describes the admin authentication system implemented in Supabase for the bar-qr-genius application. The system provides role-based access control (RBAC) with Row Level Security (RLS) policies to ensure only authorized admin users can perform sensitive operations.

## Architecture

### Database Tables

#### `user_roles` Table
Stores user role assignments with the following structure:

```sql
CREATE TABLE public.user_roles (
  user_id VARCHAR PRIMARY KEY,
  role VARCHAR NOT NULL,
  password VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);
```

**Fields:**
- `user_id`: Unique identifier linking to Supabase Auth users
- `role`: User role (e.g., 'admin', 'user')
- `password`: Encrypted password (optional)
- `created_at`: Timestamp when the role was created
- `updated_at`: Timestamp when the role was last updated
- `is_active`: Boolean flag to enable/disable the admin role

### Row Level Security (RLS) Policies

The `user_roles` table is protected by six RLS policies:

1. **Users can view their own role**
   - Allows users to view only their own role assignment

2. **Admins can view all roles**
   - Allows admin users to view all role assignments

3. **Admins can update roles**
   - Allows admin users to modify role assignments

4. **Admins can insert new roles**
   - Allows admin users to create new role assignments

5. **Admins can delete roles**
   - Allows admin users to remove role assignments

### Helper Functions

#### `is_admin(user_id uuid)`
Checks if a specific user has admin privileges.

```typescript
const isAdmin = await supabase.rpc('is_admin', { user_id: userId });
```

#### `get_user_role(user_id uuid)`
Retrrieves the role of a specific user.

```typescript
const role = await supabase.rpc('get_user_role', { user_id: userId });
```

## Usage Examples

### Check if User is Admin

```typescript
import { supabase } from './supabaseClient';

const checkAdminStatus = async (userId: string) => {
  try {
    const { data, error } = await supabase.rpc('is_admin', {
      user_id: userId
    });
    
    if (error) throw error;
    return data; // true or false
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
```

### Get User Role

```typescript
const getUserRole = async (userId: string) => {
  try {
    const { data, error } = await supabase.rpc('get_user_role', {
      user_id: userId
    });
    
    if (error) throw error;
    return data; // 'admin', 'user', etc.
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};
```

### Promote User to Admin

```typescript
const promoteToAdmin = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .upsert(
        {
          user_id: userId,
          role: 'admin',
          is_active: true
        },
        { onConflict: 'user_id' }
      );
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error promoting user:', error);
    return false;
  }
};
```

### Demote Admin to Regular User

```typescript
const demoteAdmin = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ role: 'user', is_active: true })
      .eq('user_id', userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error demoting user:', error);
    return false;
  }
};
```

### Deactivate Admin

```typescript
const deactivateAdmin = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ is_active: false })
      .eq('user_id', userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deactivating admin:', error);
    return false;
  }
};
```

## Vercel Deployment Configuration

### Environment Variables

The following environment variables should be set in Vercel for admin authentication to work:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Configuration (optional)
VITE_ADMIN_EMAIL=admin@example.com
```

### Vercel Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel Project Settings
3. Deploy the application
4. The Supabase admin authentication will be automatically available

## Security Considerations

1. **RLS is Enabled**: All queries are protected by row-level security policies
2. **Role-Based Access**: Only users with the 'admin' role can manage other users
3. **Active Status Tracking**: Admins can be deactivated without being deleted
4. **Audit Trail**: The `created_at` and `updated_at` timestamps provide an audit trail
5. **Password Field**: Optional encrypted password storage for additional security

## Current Admin Users

After the initial setup, the following admin user has been configured:
- **User ID**: 70f1a715-4f38-4ad9-b2b3-6f1dadcb2ea8
- **Email**: shamsudzahmed@gmail.com
- **Role**: admin
- **Status**: Active

## Migration History

- **November 17, 2025**: Initial admin authentication system implementation
  - Created `user_roles` table with RLS policies
  - Implemented helper functions
  - Set up admin user (shamsudzahmed@gmail.com)

## Support and Maintenance

For issues or questions about the admin authentication system:
1. Check the SQL Editor in Supabase for the setup queries
2. Review the RLS policies in Supabase Authentication > Policies
3. Refer to the helper functions documentation

## References

- [Supabase Authentication Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase SQL Functions](https://supabase.com/docs/guides/database/functions)
