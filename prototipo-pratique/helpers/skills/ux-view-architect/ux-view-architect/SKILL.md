---
name: ux-view-architect
description: >
  Expert UX/UI skill for designing, critiquing, and transforming application views and screen flows
  with a strong foundation in human-computer interaction principles. Use this skill whenever the
  user wants to create a new view/screen/page, improve an existing interface, design the navigation
  flow between screens, review the layout of UI elements, or apply UX best practices (usability,
  affordance, feedback, mental models, accessibility, cognitive load, visual hierarchy). Also
  triggers for: "design a screen for", "how should I lay out", "improve the UX of", "create a
  flow between", "which components should go where", "is my layout good", "review my interface",
  "apply HCI principles to", "help me design the user journey", "create wireframe logic for",
  or any mention of views, screens, layouts, navigation, or user flows in a software project context.
  Always use this skill when the user mentions VS Code, React, Vue, Angular, mobile (iOS/Android),
  or any frontend framework together with UX, layout, views, or screens.
---

# UX View Architect

A skill for designing and transforming application views and screen flows using Human-Computer Interaction principles. This skill bridges theory (ISO 9241-11, Nielsen heuristics, cognitive psychology) with practical implementation (HTML/CSS/JS, React, Vue, mobile).

## Workflow Overview

1. **Understand** — Capture context, users, goals, and constraints
2. **Audit** — Evaluate existing interface or brief (if provided)
3. **Architecture** — Define screen flow, information hierarchy, and layout logic
4. **Implement** — Produce code, wireframe, or annotated specification
5. **Justify** — Explain every decision with UX rationale

Always complete steps 1–3 before writing any code or layout.

---

## Step 1: Understand Context

Before designing anything, establish:

### User Analysis
- Who are the primary users? (age range, tech literacy, context of use)
- What is their **mental model** — what do they expect the system to behave like?
- What are their **primary tasks** and **goals** per screen?
- What **errors** do users commonly make in this type of interface?

### Application Context
- What is the app domain? (e-commerce, dashboard, form-heavy, creative tool, etc.)
- What platform? (web desktop, mobile, tablet, hybrid)
- What frontend framework is in use? (React, Vue, Angular, plain HTML, Flutter, etc.)
- Are there existing design tokens, component libraries, or style guides?

### Constraints
- Accessibility requirements (WCAG level? screen reader support?)
- Performance constraints (low-end devices, slow connections?)
- Localization needs?

If the user hasn't provided this info, **ask concisely** before proceeding. Group your questions — never ask more than 3 at once.

---

## Step 2: Interface Audit (if existing UI is provided)

Evaluate the existing view against:

### Nielsen's 10 Usability Heuristics
1. **Visibility of system status** — Does the UI communicate what is happening?
2. **Match between system and real world** — Does it use familiar language and concepts?
3. **User control and freedom** — Can users undo, cancel, or escape?
4. **Consistency and standards** — Are patterns consistent across the app?
5. **Error prevention** — Does the design prevent mistakes before they happen?
6. **Recognition over recall** — Are options visible rather than memorized?
7. **Flexibility and efficiency** — Do expert users have shortcuts?
8. **Aesthetic and minimalist design** — Is there unnecessary information?
9. **Help users recognize, diagnose, and recover from errors** — Are errors actionable?
10. **Help and documentation** — Is help available when needed?

### ISO 9241-11 Usability Dimensions
- **Effectiveness**: Can users complete their goals accurately?
- **Efficiency**: How much effort is required to complete tasks?
- **Satisfaction**: Is the experience pleasant and engaging?

### Additional Frameworks
- **Cognitive Load**: Is there too much information at once? Apply chunking and progressive disclosure.
- **Affordances**: Do interactive elements look interactive? Do static elements look static?
- **Feedback loops**: Does every action produce visible feedback within 100ms (immediate), 1s (responsive), or 10s (loading indicator)?
- **Fitt's Law**: Are important/frequent targets large enough and close enough?
- **Hick's Law**: Are there too many choices at once? Consider progressive disclosure.

Output the audit as a **prioritized list**: Critical issues → Major issues → Minor improvements → Nice-to-haves.

---

## Step 3: Screen Flow Architecture

Before designing individual screens, map the **navigation graph**:

### Flow Design Principles
- Every screen should answer: **"Where am I? What can I do? Where can I go?"**
- Minimize the number of steps to complete primary tasks (3-tap/click rule for critical actions)
- Design for **happy path first**, then edge cases and error states
- Every dead end needs an escape route (back, cancel, home)
- Group related actions together; separate destructive actions (delete, logout) from constructive ones

### Flow Output Format
When documenting a flow, use this structure:
```
[Screen Name]
  Purpose: one-sentence description
  Entry points: how users arrive here
  Primary action: the most important thing users do here
  Secondary actions: supporting tasks
  Exit points: where users go next
  Error states: what can go wrong and how to handle it
```

### Navigation Patterns by Context
- **Dashboard/overview**: Hub-and-spoke (central hub → detail screens)
- **Onboarding**: Linear wizard (step 1 → 2 → 3 → done)
- **E-commerce/catalog**: Browse → Filter → Detail → Cart → Checkout
- **Settings/forms**: Flat list or categorized tabs
- **Content apps**: Feed → Detail → Related → Back to feed

---

## Step 4: View Layout Design

### Information Hierarchy (F-pattern and Z-pattern)
Users scan before they read. Place critical information:
- **Top-left**: Brand/navigation (desktop) or title/back (mobile)
- **Top-center / hero area**: Primary message or action
- **Left side / above fold**: Most important content
- **Bottom-right / FAB**: Primary call-to-action (mobile)

### Element Distribution Framework

For each view, define **4 zones**:

```
┌─────────────────────────────────┐
│  ZONE 1: Orientation            │  <- Where am I? (header, breadcrumb, title)
├─────────────────────────────────┤
│  ZONE 2: Primary Content        │  <- What am I here to do/see?
│                                 │
├─────────────────────────────────┤
│  ZONE 3: Supporting Content     │  <- What else is relevant?
├─────────────────────────────────┤
│  ZONE 4: Actions / Navigation   │  <- What can I do? Where can I go?
└─────────────────────────────────┘
```

**Rules:**
- Never put primary actions below the fold on first load
- Group related elements with proximity (Gestalt: proximity principle)
- Use whitespace actively — it's not empty space, it's visual breathing room
- Align elements to a grid; misalignment creates cognitive friction
- Limit font sizes to 3 levels max per screen (heading, body, caption)
- Limit colors per screen: 1 primary, 1 accent, 1 neutral, 1 semantic (error/success)

### Component Selection Guidelines

| Need | Component | Why |
|------|-----------|-----|
| Choose 1 from many | Radio group or segmented control | Forces a single decision, reduces ambiguity |
| Choose multiple | Checkbox list or multi-select chip | Clear affordance for multiple selection |
| Input with constraints | Input + inline validation | Prevent errors at entry point |
| Dangerous action | Confirmation dialog or double-confirm input | Error prevention (heuristic #5) |
| Loading state | Skeleton screen | Maintains spatial memory, reduces perceived wait |
| Empty state | Illustrated empty state + CTA | Guides user to next step |
| Navigation 5+ items | Bottom tab bar (mobile) / sidebar (desktop) | Persistent awareness of app structure |
| Navigation 2–4 items | Top tabs or segmented control | Low cognitive overhead |

---

## Step 5: Implementation

### Output Modes

Depending on user request, deliver one of:

**A) Annotated Wireframe Specification** (text-based)
- Screen-by-screen description
- Element list with position, size rationale, and UX note
- Interaction notes (hover states, error states, transitions)

**B) Code Implementation**
- Use the framework specified by the user
- Always include: loading state, empty state, error state
- Accessibility: semantic HTML, ARIA labels, keyboard navigation, color contrast ≥ 4.5:1
- Responsive by default (mobile-first)

**C) UX Review + Diff** (for existing UI)
- Before/after comparison
- Annotated list of changes with UX rationale for each

### Code Quality Checklist
Before delivering any code:
- [ ] Semantic HTML elements (nav, main, section, article, button, not div for everything)
- [ ] All interactive elements reachable via keyboard (Tab, Enter, Space, Escape)
- [ ] ARIA roles where semantic HTML isn't enough
- [ ] Focus indicator visible (never `outline: none` without replacement)
- [ ] Color contrast passes WCAG AA (4.5:1 for text, 3:1 for large text/UI)
- [ ] Error messages are specific and actionable (not "Error occurred")
- [ ] Form labels associated with inputs (not just placeholder)
- [ ] Loading/empty/error states implemented

---

## Step 6: Justify Every Decision

Every layout and flow decision must be accompanied by a UX rationale. Use this format:

```
Decision: [What was decided]
Principle: [Which HCI principle applies]
Rationale: [Why this improves the user experience]
Trade-off: [What is sacrificed, if anything]
```

**Example:**
```
Decision: Primary CTA fixed at bottom of screen (mobile)
Principle: Fitt's Law + Thumb Zone ergonomics
Rationale: Bottom-center is the easiest reach zone for one-handed mobile use.
           Reduces motor effort for the most frequent action.
Trade-off: Slightly reduces visible content area; mitigated by making CTA 56px tall
           and collapsing on scroll for content-heavy views.
```

---

## Reference Files

- `references/hci-principles.md` — Deep reference for cognitive principles, mental models, perception, Gestalt laws, accessibility standards
- `references/patterns-library.md` — Screen pattern catalog: onboarding, dashboards, forms, lists, detail views, settings, error pages

Load these when the task requires deep theoretical grounding or pattern lookup.

---

## Quick Reference: Cognitive Principles

| Principle | Application |
|-----------|-------------|
| **Mental model alignment** | Match the interface to how users think, not how the system works |
| **Chunking** | Group information into 5±2 meaningful units |
| **Progressive disclosure** | Show only what's needed now; reveal complexity on demand |
| **Affordance** | Make clickable things look clickable; static things look static |
| **Feedback** | Every action needs a response within 100ms–10s depending on duration |
| **Consistency** | Same action → same result, everywhere in the app |
| **Forgiveness** | Make it easy to undo, go back, or recover from mistakes |
| **Recognition > Recall** | Show options rather than requiring users to remember them |
| **Cognitive Load** | Reduce the number of things the user must think about simultaneously |
| **Gestalt Proximity** | Things that are close together are perceived as related |
| **Gestalt Similarity** | Things that look alike are perceived as belonging to the same group |
| **Serial Position Effect** | First and last items in a list are remembered best |
