# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1794b7af-caa3-4859-b4a1-1110d663585e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1794b7af-caa3-4859-b4a1-1110d663585e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1794b7af-caa3-4859-b4a1-1110d663585e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


## Admin Authentication System

This project includes a comprehensive admin authentication system using Supabase Row Level Security (RLS).

### Overview

- **Role-Based Access Control (RBAC)**: Manage user roles and permissions
- **Row Level Security Policies**: 5 RLS policies protect the `user_roles` table
- **Helper Functions**: `is_admin()` and `get_user_role()` functions for easy permission checks
- **Audit Trail**: Timestamps track when roles are created and updated

### Quick Start

1. Review the admin authentication documentation: [ADMIN_AUTH_SETUP.md](./ADMIN_AUTH_SETUP.md)
2. Check the SQL migration: [supabase/migrations/20251117000000_admin_auth_setup.sql](./supabase/migrations/20251117000000_admin_auth_setup.sql)
3. Current admin user: shamsudzahmed@gmail.com

### Usage

```typescript
// Check if user is admin
const isAdmin = await supabase.rpc('is_admin', { user_id: userId });

// Get user role
const role = await supabase.rpc('get_user_role', { user_id: userId });
```

For more details, see the [Admin Authentication Setup Guide](./ADMIN_AUTH_SETUP.md).
