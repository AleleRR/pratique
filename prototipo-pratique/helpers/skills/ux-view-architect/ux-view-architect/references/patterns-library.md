# Screen Patterns Library

## Table of Contents
1. Onboarding Flow
2. Authentication Screens (Login / Register / Forgot Password)
3. Dashboard / Home Screen
4. List / Feed Views
5. Detail Views
6. Form / Input Views
7. Settings Screens
8. Empty States
9. Error States
10. Modal and Overlay Patterns
11. Navigation Patterns
12. Search and Filter Patterns

---

## 1. Onboarding Flow

### Purpose
Guide new users to value as quickly as possible. Every step must earn its place — unnecessary steps cause dropout.

### Pattern: Progressive Value Revelation
```
[Welcome] → [Core Value Prop] → [Personalization] → [Permission Requests] → [First Use]
```

### Rules
- **Max 3–5 steps** for onboarding. If you need more, cut content, not steps.
- Lead with value, not registration. Let users see the app before asking for data.
- Permissions (notifications, location, camera) must be contextualized: explain *why* before asking.
- Provide skip option, but don't make it the obvious choice.
- Progress indicator required (dots, steps "2 of 4", progress bar).
- Last step should feel like an arrival, not just the end.

### Layout
```
┌─────────────────────────┐
│   [Skip]                │  <- top-right, subtle
│                         │
│    [Illustration]       │  <- 40% of screen height
│                         │
│   Headline              │  <- large, bold
│   Supporting paragraph  │  <- 2 lines max
│                         │
│  ● ○ ○ ○               │  <- progress dots
│                         │
│  [Primary CTA Button]   │  <- full width, bottom
└─────────────────────────┘
```

---

## 2. Authentication Screens

### Login
```
┌──────────────────────────┐
│  [Logo / App Name]       │
│                          │
│  [Email Input]           │
│  [Password Input]  [Show]│
│  Forgot password?        │
│                          │
│  [Log In Button]         │
│                          │
│  ──────── or ────────    │
│  [Continue with Google]  │
│                          │
│  Don't have an account?  │
│  [Sign up]               │
└──────────────────────────┘
```

**Rules:**
- Auto-focus email field on load
- Show/hide password toggle (never force visibility)
- "Forgot password" link near password field (spatial proximity)
- Validate on blur, not on keystroke (don't show errors while typing)
- Persist email across login attempts (localStorage or state)
- Error: "Incorrect email or password" — never reveal which one is wrong (security)

### Register
- Show password requirements proactively (before error), not after submission
- Confirm password field: validate in real-time once user starts typing in confirm field
- Never show "password too weak" before user has finished typing

### Forgot Password
```
Step 1: Enter email → [Send Reset Link]
Step 2: "Check your inbox" confirmation + [Resend] if not received (disabled 60s)
Step 3: (email link) → Enter new password → Confirm → [Done]
```

---

## 3. Dashboard / Home Screen

### Purpose
Give users immediate orientation (where am I, what happened, what should I do next) and quick access to frequent actions.

### Layout Zones
```
┌────────────────────────────────┐
│  [Header: Logo + User Avatar]  │  ORIENTATION
├────────────────────────────────┤
│  [Welcome / Summary Card]      │  PRIMARY CONTEXT
│  [Key Metric 1] [Key Metric 2] │
├────────────────────────────────┤
│  [Primary CTA or Quick Action] │  MAIN ACTION
├────────────────────────────────┤
│  Recent / Relevant Content     │  SECONDARY CONTENT
│  [Item] [Item] [Item]          │
├────────────────────────────────┤
│  [Bottom Navigation]           │  NAVIGATION
└────────────────────────────────┘
```

### Rules
- Answer "what's new / what needs my attention" above the fold
- Max 3 primary metrics visible without scroll
- Differentiate tasks (action required) from notifications (informational)
- Empty dashboard = worst-case scenario. Plan for "first time" and "no activity" states.
- Don't overload with widgets — every element competes for attention

---

## 4. List / Feed Views

### Patterns

**Simple List** (tasks, messages, files)
```
[Icon] Title                    [Badge / Time]
       Subtitle / Preview
──────────────────────────────────────────────
[Icon] Title                    [Badge / Time]
       Subtitle / Preview
```

**Card Grid** (products, media, articles)
```
[Card Image]    [Card Image]
[Title]         [Title]
[Subtitle]      [Subtitle]
[Price / CTA]   [Price / CTA]
```

**Feed** (social, activity log)
```
[Avatar] Name · Timestamp
         Content / Media
         [Like] [Comment] [Share]
─────────────────────────────────
```

### Rules
- **Skeleton screens** on load (not spinner), preserving layout
- **Infinite scroll** for content feeds; **pagination** for data tables (user needs to track position)
- Swipe actions (mobile) for frequent secondary actions (delete, archive, mark read)
- Pull to refresh: always add haptic feedback and visual indicator
- Empty state must explain why it's empty AND offer a path forward
- Sort/filter controls: persistent and visible, not buried in a menu

### Performance Perception
- First contentful paint < 1.5s: show skeleton
- Prioritize above-the-fold content first (lazy load below fold)
- Avoid layout shift after images load (reserve dimensions with aspect-ratio CSS)

---

## 5. Detail Views

### Purpose
Give users complete information about a single item and the relevant actions they can take on it.

### Layout
```
┌──────────────────────────────┐
│  [← Back]    Title    [⋯]   │  <- Header with back + overflow menu
├──────────────────────────────┤
│  [Hero Image / Media]        │  <- Optional, 40–60% of screen
├──────────────────────────────┤
│  Primary Heading             │
│  Key metadata (date, status) │
│                              │
│  Body content / description  │
│                              │
│  Supporting sections...      │
├──────────────────────────────┤
│  [Primary Action Button]     │  <- Fixed bottom or prominent position
└──────────────────────────────┘
```

### Rules
- Primary action (buy, approve, send) always visible without scroll (sticky or above fold)
- Destructive actions (delete, reject) in overflow menu (⋯) or confirmation dialog
- Related items / "You may also like" only after all primary content
- Share/export controls in header (not page content)

---

## 6. Form / Input Views

### Layout Principles
- **Single column** for most forms (easier to follow on all screen sizes)
- **Label above input** (not beside, not placeholder-only)
- **Group logically**: Personal info → Contact → Payment → Review
- **Show only current group** (wizard) or **all groups** (short forms < 5 fields)
- Submit button at bottom, after all inputs

### Field Design
```
Label                  <- above, always visible
[Input Field        ]  <- clear border, sufficient height (44px min)
Helper text            <- subtle, below field
Error message          <- red, below field, replaces helper text
```

**Field Sizing:**
- Short text (name, city): full width on mobile, 50% on desktop
- Long text (description, notes): full width, multi-line (textarea)
- Numeric (age, quantity): auto-width or narrow (80px)
- Date: native date picker on mobile, custom on desktop

### Validation Strategy
- **On blur**: validate when user leaves a field
- **On submit**: validate all at once; scroll to first error
- **Never**: validate while user is actively typing (except password strength)
- **Always**: show success state for async validations (email availability check)

### Multi-step Forms (Wizard)
```
[Step 1: Basic Info] → [Step 2: Details] → [Step 3: Review] → [Submit]
     ●──────────────────────○──────────────────○
```
- Show clear progress indicator
- Allow navigation back to previous steps
- Preserve data between steps (don't clear on back)
- Review step before submit: show summary, allow editing

---

## 7. Settings Screens

### Structure
Group settings by topic, not by technical implementation:

```
Account
  └── Profile
  └── Password
  └── Email preferences

Notifications
  └── Push notifications
  └── Email digests
  └── In-app alerts

Privacy & Security
  └── Data sharing
  └── Two-factor authentication
  └── Active sessions

Appearance
  └── Theme (Light / Dark / System)
  └── Font size

Danger Zone
  └── Delete account
  └── Export data
```

### Rules
- Destructive settings (delete account) visually separated and clearly labeled "Danger Zone"
- Toggles should show current state, not action ("Notifications: ON" not "Enable notifications")
- Changes auto-save when possible; show confirmation toast
- When changes require restart or logout, warn before the user makes the change
- Search in settings for apps with >15 settings items

---

## 8. Empty States

Every list, dashboard, and detail view needs an empty state. Empty ≠ broken.

### Types
1. **First-time use**: User hasn't created anything yet
2. **No results**: Search or filter returned nothing
3. **Cleared state**: User deleted everything
4. **Error-caused**: Content unavailable due to error

### Layout
```
    [Illustration / Icon]   <- friendly, on-theme, 30–40% of space
    
    Headline                <- "No items yet" / "Nothing matches your search"
    Supporting text         <- What this section is for + what to do next
    
    [Action Button]         <- Primary next step (optional for search empty states)
```

### Copy Examples
- First-time: "Your inbox is empty — start a conversation to see messages here."
- No search results: "No results for 'xyz'. Try different keywords or browse all categories."
- Cleared: "All done! Nothing left to review."

---

## 9. Error States

### Full-page Errors (4xx, 5xx, network failure)
```
┌──────────────────────────────┐
│  [Illustration]              │
│  "Page not found" / "Oops"   │
│  Friendly explanation        │
│  [Go Home] [Try Again]       │
└──────────────────────────────┘
```

### Inline Errors (component-level)
- Inline with the component that failed
- Show what went wrong + retry button
- Don't show raw error codes to users

### Toast / Snackbar Errors
- Use for transient, non-blocking errors
- Max 2 lines of text
- Include action when applicable: "Failed to save. [Retry]"
- Auto-dismiss after 5–8 seconds for info/success; persist for errors

---

## 10. Modal and Overlay Patterns

### When to Use Modals
✅ Confirmation of destructive action
✅ Quick input that doesn't warrant a new page
✅ Image/media viewer (lightbox)
✅ Critical alert requiring immediate attention

❌ Never use for: complex forms (use page), frequent actions (use inline), navigation

### Modal Anatomy
```
┌──────────────────────────────┐
│  Modal Title              [✕]│
├──────────────────────────────┤
│                              │
│  Modal content               │
│  (keep it focused and short) │
│                              │
├──────────────────────────────┤
│  [Cancel]    [Primary Action]│
└──────────────────────────────┘
```

**Rules:**
- Always dismissible via: X button, Cancel, pressing Escape, clicking overlay
- Trap focus inside modal (keyboard users can't tab outside)
- Return focus to trigger element when closed
- Backdrop overlay: semi-transparent, darkens but doesn't black out background

### Confirmation Dialogs
- Use for irreversible or high-impact actions only
- Make cancel the visually prominent option; destructive action secondary
- Echo what will happen: "Delete 'Project Alpha'? This cannot be undone."
- Don't ask users to type "DELETE" unless stakes are extremely high

---

## 11. Navigation Patterns

### Mobile Navigation
| Pattern | When to use | Max items |
|---------|------------|-----------|
| Bottom Tab Bar | Primary navigation, 2–5 destinations | 5 |
| Hamburger/Drawer | Secondary navigation, many items | Unlimited |
| Top Tabs / Segmented | Switching between related views | 4 |
| Back button + Title | Hierarchical navigation | — |

### Desktop Navigation
| Pattern | When to use |
|---------|------------|
| Top navbar | Marketing sites, simple apps |
| Left sidebar | Complex apps with many sections (dashboards, admin) |
| Mega menu | E-commerce with many categories |
| Breadcrumb | Deep hierarchies |

### Rules
- **Active state** must be visually obvious (color, weight, indicator)
- **Current location** always visible (no navigation amnesia)
- **Back behavior** must be predictable (never surprise back navigation)
- **Deep links** should work (users can share or bookmark any view)

---

## 12. Search and Filter Patterns

### Search
```
[🔍 Search placeholder...]    <- persistent, top of list
```
- Show results instantly (as-you-type) for local data
- Show loading indicator for server-side search
- Highlight matched terms in results
- Recent searches shown when field is focused (if empty)
- Clear button (✕) visible when input has content

### Filter Patterns
| Volume of data | Pattern |
|---------------|---------|
| < 10 items | No filter needed |
| 10–50 items | Inline filter chips |
| 50–500 items | Filter drawer or sidebar |
| > 500 items | Faceted search (filter + search combined) |

**Filter chip pattern:**
```
All  [Category ▾]  [Date ▾]  [Status ▾]   [Clear filters]
```

- Show active filter count on collapsed filter controls
- Filters apply immediately (no "Apply" button unless performance requires it)
- "Clear all" always visible when any filter is active
- Sort controls separate from filter controls
