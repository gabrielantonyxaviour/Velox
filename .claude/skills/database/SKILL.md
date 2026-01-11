---
name: database
description: Add/remove/edit data or run migrations or make changes in our supabase tables (project)
---

**NEVER: Use Playwright, create manual SQL scripts, or use local DB**

## Project ID: qrsdodlbzjghfxoppcsp

## IMPORTANT: All tables/views/functions MUST be prefixed with `velox_`

## Active tables (off-chain data):
- No tables created yet. Create tables as needed with `velox_` prefix.

## Auth: Using SERVICE ROLE KEY (no RLS)
- RLS is DISABLED on all velox_ tables
- No Supabase auth - wallet-based auth handled by Privy
- User identified by wallet address (primary key)

## Environment Variables (server-side only):
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Service role key (NOT anon key)
- NO `NEXT_PUBLIC_*` Supabase variables

## Supabase Client Setup (server-side only):
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)
```

## Schema operations:
```bash
cd frontend

# Create migration
npx supabase migration new description

# Push to remote
npx supabase db push

# Regenerate types (always after schema change)
npx supabase gen types typescript --project-id qrsdodlbzjghfxoppcsp > types/supabase.ts

# Check current schema
npx supabase db dump --remote --schema-only
```

## Check types:
See `frontend/types/supabase.ts` for current schema TypeScript types

Always execute commands directly. Never generate scripts for manual execution.
