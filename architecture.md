# Lightweight Outlook Email Agent – Full Architecture

## 🗂️ File + Folder Structure

```
lightweight-outlook-agent/
├── app/
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Layout with auth/session wrapper
│   └── drafts/
│       └── page.tsx              # Draft review & edit page
├── components/
│   ├── EmailCard.tsx            # Display summarized or important email
│   ├── DraftCard.tsx            # Draft email card with edit/send controls
│   └── Header.tsx               # Minimal top nav
├── lib/
│   ├── supabase.ts              # Supabase client and auth helpers
│   ├── outlookClient.ts         # Outlook MCP API wrapper
│   └── summarizer.ts            # Logic for summarizing and ranking emails
├── services/
│   ├── fetchEmails.ts           # Calls Outlook MCP and persists emails
│   └── generateDrafts.ts        # Creates draft replies for review
├── types/
│   └── index.ts                 # Shared TypeScript interfaces (Email, Draft, User)
├── styles/
│   └── globals.css              # Global minimalist styling
├── public/                      # Static assets
├── .env.local                   # Environment variables (API keys, etc.)
├── middleware.ts                # Auth middleware (optional)
├── next.config.js               # Next.js config
├── tsconfig.json
└── package.json
```

## 🧠 Responsibilities of Each Part

### Frontend (`app/` + `components/`)
- **Homepage (`app/page.tsx`)**
  - Displays summarized important emails (from Supabase)
  - Triggers MCP refresh via API route

- **Drafts Page (`app/drafts/page.tsx`)**
  - Shows auto-generated drafts and allows inline edits
  - Submit button triggers email send via MCP

- **EmailCard / DraftCard**
  - Reusable UI blocks with tailwind classes

- **Header.tsx**
  - Minimal header with session display + logout

---

### Backend Services (`lib/`, `services/`)
- **`lib/supabase.ts`**
  - Client setup with session persistence

- **`lib/outlookClient.ts`**
  - Handles OAuth token and wraps the Outlook MCP API (fetch, send, etc.)

- **`lib/summarizer.ts`**
  - Heuristic or LLM-based logic to filter & rank email importance

- **`services/fetchEmails.ts`**
  - Uses MCP server to fetch user’s inbox
  - Applies summarizer → stores in Supabase `emails` table

- **`services/generateDrafts.ts`**
  - Identifies reply-needed threads → autogenerates response → stores in Supabase `drafts` table

---

### Database (Supabase)
- `emails` table:
  ```ts
  {
    id: string,
    user_id: string,
    subject: string,
    sender: string,
    body: string,
    importance_score: number,
    requires_response: boolean,
    is_read: boolean
  }
  ```

- `drafts` table:
  ```ts
  {
    id: string,
    email_id: string,
    user_id: string,
    draft_body: string,
    status: 'pending' | 'sent'
  }
  ```

- Supabase Auth handles session + user linking

---

### State Management
- Uses **React Server Components + Client Components split**
- Light state via `useState` or `useSWR` for email/draft fetching
- Auth session from Supabase via `useUser()` or `createServerComponentClient`
- Minimal client-side state (no Redux or Zustand)

---

### API Integration
- Outlook MCP (https://github.com/ryaker/outlook-mcp):
  - Connects via REST (or gRPC if extended)
  - Fetches user’s inbox
  - Sends messages
- API keys + MCP instance URL managed in `.env.local`

---

### 🖌️ Styling Philosophy
- Use TailwindCSS for minimalist, modern look
- Focus on whitespace, sharp typographic hierarchy, and fast load
- No animations, just raw focus on clarity and speed

---

## 🔐 Auth Flow
1. User signs in via Supabase (email or OAuth)
2. Session token used in `layout.tsx` to gate routes
3. User connects Outlook via MCP's OAuth flow (persist token in Supabase if needed)

---

## 🔁 Email Lifecycle Flow
1. User signs in
2. On dashboard load, MCP sync is triggered
3. Emails fetched → summarized → stored
4. Important emails shown, others marked read
5. Drafts generated for emails that require response
6. User reviews/edits → clicks send → triggers MCP send + update

---

## ✅ Step-by-Step MVP Task Plan

### PHASE 1: Base Setup
1. **Initialize Next.js app with TypeScript**
   - Create project using `npx create-next-app`
   - Add `tailwindcss`, `@supabase/supabase-js`

2. **Set up Supabase project and auth**
   - Create project on Supabase
   - Add `emails` and `drafts` tables
   - Enable email login
   - Test login locally

3. **Create `lib/supabase.ts` with Supabase client**
   - Export initialized Supabase client
   - Test login session retrieval with `useUser()`

4. **Create `app/layout.tsx` with session-based layout**
   - Add global CSS, Tailwind setup
   - Display auth state with sign in/out

### PHASE 2: Email Sync + Display
5. **Implement `lib/outlookClient.ts` basic fetch wrapper**
   - Define `getInbox()` that returns mock email data
   - Make this testable with fake credentials

6. **Build `services/fetchEmails.ts`**
   - Call `getInbox()` and persist test emails to Supabase `emails` table
   - Mark spam as read and rank important emails (via dummy scores)

7. **Create `app/page.tsx` that lists important emails**
   - Fetch from Supabase (filter `importance_score > threshold`)
   - Display using `EmailCard` component

8. **Build `EmailCard.tsx` to show sender, subject, body**
   - Tailwind styled, test with dummy props

### PHASE 3: Draft Generation + Review
9. **Implement `services/generateDrafts.ts`**
   - Identify `requires_response` emails
   - Autogenerate simple drafts (e.g., “Thanks for the update!”)
   - Store in `drafts` table

10. **Create `app/drafts/page.tsx` with draft list**
    - Fetch from Supabase where `status = 'pending'`
    - Display using `DraftCard`

11. **Build `DraftCard.tsx` to edit + send drafts**
    - Input box for editing text
    - `Send` button triggers MCP send

12. **Extend `outlookClient.ts` with `sendEmail()`**
    - Implement send logic via MCP API
    - Log/confirm email was "sent"

13. **Update draft status after sending**
    - Mark draft `status = 'sent'` after successful send

### PHASE 4: Polish + MVP Finish
14. **Implement minimal `Header.tsx`**
    - Include logo + auth status + logout

15. **Add `/api/sync` route to run fetch + summarize**
    - Triggered manually or on page load

16. **Add loading/success states and basic error handling**
    - On email fetch, draft send, etc.

17. **Polish CSS: whitespace, spacing, and mobile responsiveness**
    - Final UI review for simplicity and readability

---

Let me know if you want the LLM instructions templated for each task.
