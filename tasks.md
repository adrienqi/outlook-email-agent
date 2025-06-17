# MVP Task Plan – Lightweight Outlook Email Agent

Each task below is intentionally atomic: focused on one concern, easy to test, and isolated.

---

## ✅ PHASE 1: Base Setup

### 1. Initialize project
- **Start:** Run `npx create-next-app@latest --ts`
- **End:** Local dev server renders default homepage

### 2. Add TailwindCSS
- **Start:** Install Tailwind via PostCSS method
- **End:** A class like `text-red-500` renders correctly on screen

### 3. Create `.env.local` with placeholder keys
- **Start:** Create `.env.local` with dummy Supabase + MCP keys
- **End:** `process.env.NEXT_PUBLIC_SUPABASE_URL` logs in dev console

### 4. Create `lib/supabase.ts`
- **Start:** Install `@supabase/supabase-js`
- **End:** Call `supabase.auth.getUser()` successfully logs user info

### 5. Create `app/layout.tsx`
- **Start:** Build a layout wrapper with `children` slot
- **End:** Shows user auth state and includes `<Header />`

---

## 📥 PHASE 2: Email Sync + Display

### 6. Create `lib/outlookClient.ts` stub
- **Start:** Export `getInbox()` that returns mocked list of email objects
- **End:** Returns list with 2-3 emails for dev use

### 7. Build `services/fetchEmails.ts`
- **Start:** Import `getInbox()` and write loop to insert into Supabase `emails`
- **End:** Running the script inserts emails in DB

### 8. Create `types/index.ts`
- **Start:** Define `Email` and `Draft` interfaces
- **End:** Used without TS errors in fetch services

### 9. Create `app/page.tsx`
- **Start:** Fetch emails from Supabase client-side
- **End:** Render list of important emails

### 10. Create `components/EmailCard.tsx`
- **Start:** Render sender, subject, body
- **End:** Renders with dummy email props

---

## ✍️ PHASE 3: Draft Generation + Review

### 11. Build `services/generateDrafts.ts`
- **Start:** Query `emails` with `requires_response = true`
- **End:** Insert response drafts to `drafts` table

### 12. Create `app/drafts/page.tsx`
- **Start:** Fetch drafts from Supabase
- **End:** List `DraftCard`s where `status = 'pending'`

### 13. Build `components/DraftCard.tsx`
- **Start:** Display draft body and editable input
- **End:** Input can modify and show updated value

### 14. Add send button to `DraftCard`
- **Start:** Clicking send calls stub
- **End:** Logs "sent draft {id}" to console

### 15. Extend `outlookClient.ts` with `sendEmail()`
- **Start:** Add `sendEmail({ to, body })` using MCP
- **End:** Test endpoint returns success from MCP

### 16. Update draft status after sending
- **Start:** After send, call Supabase to update `status`
- **End:** Draft disappears from UI

---

## 🧼 PHASE 4: Polish & Automation

### 17. Build `components/Header.tsx`
- **Start:** Add static title and `Sign Out` button
- **End:** Header shown on every route

### 18. Create `/api/sync.ts` route
- **Start:** Call `fetchEmails()` and `generateDrafts()`
- **End:** Hitting `/api/sync` from browser syncs inbox

### 19. Add loading + error states
- **Start:** Add spinner while loading emails
- **End:** Errors render gracefully in UI

### 20. Polish styles
- **Start:** Ensure vertical rhythm, spacing, and mobile-friendliness
- **End:** Looks modern and minimal on desktop + mobile

---

Let me know if you want an automation wrapper that runs these tasks sequentially with checks between.
