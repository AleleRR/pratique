# HCI Principles — Deep Reference

## Table of Contents
1. Cognitive Psychology Foundations
2. Perception and Attention
3. Mental Models
4. Memory and Cognitive Load
5. Gestalt Laws Applied to UI
6. Affordances, Signifiers, and Mappings
7. Feedback and System Status
8. Error Psychology
9. Accessibility Principles
10. Motivation and Engagement (Hedonics)

---

## 1. Cognitive Psychology Foundations

### Dual Process Theory (Kahneman)
- **System 1** (fast, automatic): Pattern recognition, habit-driven interaction. Design frequent actions to be effortless.
- **System 2** (slow, deliberate): Reasoning, reading, decision-making. Reserve this for high-stakes decisions only.

**Design implication**: Routine tasks should be completable with System 1 (familiar patterns, minimal reading). Reserve cognitive effort for decisions that matter (e.g., confirming a purchase, choosing a plan).

### Goal Hierarchy (GOMS Model)
Users operate at multiple levels:
- **Goals**: "I want to buy this product"
- **Operators**: "I'll click Add to Cart"
- **Methods**: "I'll navigate to product → click button → proceed to checkout"
- **Selection rules**: "If I'm unsure, I'll look for a cart icon"

**Design implication**: Support users at all levels. Provide direct paths to goals (search, shortcuts) and clear methods (visible CTAs, logical flows).

---

## 2. Perception and Attention

### Pre-attentive Attributes
These are processed instantly before conscious thought:
- Color (hue, saturation, brightness)
- Shape
- Size
- Orientation
- Motion
- Position

**Design implication**: Use pre-attentive attributes to draw attention to critical elements. A red error badge is noticed before text is read.

### Change Blindness
Users miss changes that occur outside their focus of attention.

**Design implication**: Never change content in peripheral areas without notification. Toast notifications, badges, and highlighting draw attention to changes.

### Attention Tunneling
When focused on a task, users ignore peripheral information.

**Design implication**: Place critical alerts in the user's focal area (inline, not in sidebars). Don't rely on sidebar notifications for time-sensitive information.

### Visual Hierarchy Cues (in order of effectiveness)
1. Size (larger = more important)
2. Color/Contrast
3. Position (top-left to bottom-right reading order in LTR languages)
4. Weight (bold vs regular)
5. Whitespace (isolated elements draw more attention)
6. Motion

---

## 3. Mental Models

A **mental model** is the user's internal representation of how a system works.

### Types
- **Structural model**: How the system is organized internally (often irrelevant to users)
- **Functional model**: What the system does and how to use it
- **Conceptual model**: The design's intended model — what the designer wants users to understand

**Goal**: Align the conceptual model with users' existing mental models.

### Practical Application
- Use familiar metaphors (shopping cart, folder, inbox)
- Match terminology to users' domain, not technical implementation
- Reveal system structure progressively — don't expose complexity users don't need
- When violating conventions, provide clear orientation cues

### Norman's Seven Stages of Action
1. Form the goal
2. Form the intention
3. Specify the action
4. Execute the action
5. Perceive the state of the world
6. Interpret the perception
7. Evaluate the outcome

**Gulfs to bridge:**
- **Gulf of Execution**: Can users figure out how to do what they want?
- **Gulf of Evaluation**: Can users tell if the system did what they wanted?

---

## 4. Memory and Cognitive Load

### Working Memory Limits (Miller's Law)
Working memory holds **7±2 chunks** of information simultaneously.

**Design implications:**
- Navigation menus: max 7 items
- Form steps: chunk into logical groups of 3–5 fields
- Multi-step processes: show progress indicators
- Tables: limit columns to what's necessary for the task

### Types of Memory
- **Recognition** (easy): "Is this what I was looking for?" → show options
- **Recall** (hard): "What was the command I used?" → avoid requiring recall

**Design implication**: Always prefer recognition interfaces (lists, autocomplete, visible options) over recall interfaces (blank text fields, command-line inputs).

### Cognitive Load Types
- **Intrinsic**: Complexity inherent to the task itself (can't be eliminated)
- **Extraneous**: Complexity added by poor design (must be eliminated)
- **Germane**: Mental effort that builds user competency (support, don't overload)

**Strategies to reduce extraneous load:**
- Progressive disclosure: hide advanced options behind "More" or secondary menus
- Defaults: pre-fill sensible values; users can change if needed
- Chunking: group related items visually and logically
- Eliminate redundancy: don't say the same thing twice on the same screen
- Use visuals to replace text descriptions where possible

---

## 5. Gestalt Laws Applied to UI

### Law of Proximity
Elements close together are perceived as related.

**Application**: Group form fields by topic. Separate sections with whitespace, not just lines.

### Law of Similarity
Elements that look similar are perceived as belonging to the same group.

**Application**: Use consistent visual treatment for elements of the same type (all buttons look like buttons; all labels look like labels).

### Law of Continuity
Elements arranged on a line or curve are perceived as related.

**Application**: Use alignment to guide the eye. Left-align text in flowing content. Use grid structure to create invisible lines of relationship.

### Law of Closure
The mind completes incomplete shapes.

**Application**: Partially visible cards suggest scrollability. Progress bars exploit closure by showing what's "missing."

### Law of Figure-Ground
Elements are perceived as either foreground (figure) or background (ground).

**Application**: Use background color, blur, or overlay to establish modals and drawers as "on top." Never let foreground and background compete.

### Law of Common Fate
Elements moving in the same direction are perceived as related.

**Application**: Animate related elements together. When a drawer opens, its content slides in as one unit.

### Law of Prägnanz (Simplicity)
The mind interprets ambiguous images as the simplest possible form.

**Application**: Use simple, clear iconography. Avoid overly literal or complex icons — simple geometric icons are faster to recognize.

---

## 6. Affordances, Signifiers, and Mappings

### Affordance
A property that enables action. A door handle *affords* pulling. A flat plate *affords* pushing.

**Design implication**: Interactive elements must visually suggest interactivity:
- Buttons: raised appearance, background color, border-radius
- Links: underline or distinct color
- Drag handles: dots/lines indicating grip points
- Sliders: thumb element on a track

**Anti-pattern**: Flat design that makes buttons indistinguishable from labels.

### Signifiers
Visual cues that communicate where and how to act.

- "Click here" text = signifier
- Underline = signifier (link)
- Chevron icon (›) = signifier (navigation)
- Hamburger menu = signifier (navigation drawer)

**Design implication**: Don't rely on hover states alone to reveal interactivity — hover is invisible on touch devices.

### Mapping
The relationship between controls and their effects.

- **Good mapping**: Volume slider moves right = louder (spatial relationship)
- **Bad mapping**: Up arrow = decrease, down arrow = increase

**Design implication**: Map controls to outcomes spatially or metaphorically. Form fields should appear in the order they'll be processed. Deletion controls should be separate from save controls.

---

## 7. Feedback and System Status

### Response Time Guidelines (Nielsen)
- **< 100ms**: Feels instantaneous. Ideal for button clicks, toggles, hover effects.
- **100ms – 1s**: User notices delay but no explanation needed. Ideal for page transitions.
- **1s – 10s**: User loses focus. Show a loading indicator.
- **> 10s**: Show progress bar with estimated completion. Allow cancellation.

### Feedback Types
- **Immediate**: Visual state change (button pressed state, form focus ring)
- **Short-term**: Toast notification, inline validation message
- **Long-term**: Email confirmation, dashboard updated data

### Status Visibility Patterns
- **Button states**: Default → Hover → Active → Loading → Success/Error → Disabled
- **Form validation**: Validate on blur (not on keystroke), show error inline below field
- **Async actions**: Optimistic UI (show success immediately, rollback on error)
- **Background tasks**: Persistent notification in header/status bar

---

## 8. Error Psychology

### Norman's Error Classification
- **Slips** (execution errors): User knows what to do but executes incorrectly (e.g., taps wrong small button)
- **Mistakes** (planning errors): User has the wrong goal or plan (e.g., deletes file thinking it's a copy)

### Error Prevention Strategies
- **Constraints**: Disable options that aren't valid in the current state
- **Confirmation**: Require explicit confirmation for destructive/irreversible actions
- **Undo**: Make any reversible action undoable (Ctrl+Z, "Restore" button, 5-second undo toast)
- **Defaults**: Set sensible defaults to reduce chances of bad input
- **Inline validation**: Catch errors at input time, not submission time
- **Clear affordances**: Prevent slips by making targets large enough (min 44×44px touch target per WCAG)

### Error Message Writing Guidelines
Bad: "Error 422"
Bad: "Something went wrong"
Bad: "Invalid input"
Good: "Email address is required"
Good: "Password must be at least 8 characters"
Good: "That email is already registered. [Log in instead?]"

Error messages must be:
1. **Specific** — what went wrong
2. **Plain language** — no technical jargon
3. **Actionable** — tell the user what to do next
4. **Polite** — never blame the user

---

## 9. Accessibility Principles (WCAG 2.1 / POUR)

### Perceivable
- Text alternatives for all non-text content (alt attributes)
- Captions for video/audio
- Color contrast: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold), 3:1 for UI components
- Don't convey information by color alone (use icon + color, not color alone)

### Operable
- All functionality available via keyboard
- No keyboard traps (user can always escape a modal or component)
- Sufficient time for time-limited interactions
- Skip navigation link for screen reader users
- Focus indicator always visible
- Minimum touch target: 44×44px

### Understandable
- Language of page declared (lang attribute)
- Consistent navigation across pages
- Labels for all form inputs (not just placeholders)
- Inline error messages associated with their field (aria-describedby)
- Instructions available before they're needed

### Robust
- Valid, semantic HTML
- ARIA used correctly (don't add role="button" to a div when you can use `<button>`)
- Tested with real assistive technology (NVDA, VoiceOver)

---

## 10. Motivation and Engagement (Hedonics / UX Beyond Usability)

### Hassenzahl's Pragmatic/Hedonic Model
- **Pragmatic quality**: How well the product lets users achieve their goals (efficiency, usability)
- **Hedonic quality**: How the product makes users feel (stimulation, identity, evocation)

**Design implication**: A product can be highly usable but feel cold and unappealing. Emotional design is not decoration — it creates trust and loyalty.

### Ergonomic/Hedonistic Pyramid (Law's Six Elements)
1. **Functionality**: Does it work?
2. **Reliability**: Does it work consistently?
3. **Usability**: Is it easy to use?
4. **Proficiency**: Does it help users improve?
5. **Creativity**: Does it inspire and empower?
6. **Meaning**: Does it feel personally significant?

**Design implication**: Address lower levels first (function, reliability) before investing in higher levels. A beautiful, creative app that crashes is worse than an ugly one that works.

### Delight and Micro-moments
Small, unexpected moments of joy increase perceived quality:
- Subtle animation on success (confetti, checkmark bounce)
- Friendly empty states with illustrations and helpful CTAs
- Progress celebrations ("You're halfway there!")
- Personality in error messages ("Oops, that page wandered off")

**Warning**: Delight must be optional and subdued after first exposure. Repeated animations lose their charm and become friction.
