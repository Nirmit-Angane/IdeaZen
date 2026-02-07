# IdeaZen Design System Guidelines

## Overview

This document defines the design system guidelines for IdeaZen. These rules ensure consistency, quality, and maintainability across the entire application.

**Philosophy:** Use color only to communicate meaning, never decoration. Every design decision should serve a functional purpose and enhance user understanding.

---

## General Development Guidelines

### Code Structure

Only use absolute positioning when necessary. Opt for responsive and well-structured layouts using flexbox and grid by default.

Refactor code as you go to keep the codebase clean and maintainable.

Keep file sizes reasonable and put helper functions and components in their own files.

Use meaningful variable and function names that clearly communicate intent.

Follow the DRY principle - Don't Repeat Yourself. Extract shared logic into reusable functions.

### Component Guidelines

Each component should have a single, clear responsibility.

Props should be explicitly typed using TypeScript interfaces.

Keep components small and focused - break large components into smaller ones.

Use composition over inheritance for component reusability.

Document complex logic with inline comments explaining why, not what.

---

## Semantic Color System

### Core Principle

Every color must communicate meaning. Never use color purely for decoration or visual variety.

### Color Definitions and Usage

**Deep Blue #1F3C88 - Trust, Structure, Authority**

Use for primary headings, main call-to-action buttons, navigation elements, and structural components.

Represents foundational elements users can trust and rely on.

Do not use for decorative accents or secondary content.

**AI Purple #7C6CF6 - Intelligence, Reasoning, AI Features**

Use for AI reasoning sections, AI-generated content indicators, smart features, and intelligence-related messaging.

Represents the AI's thought process and recommendations.

Only use when content is actually AI-generated or AI-related.

**Success Green #22C55E - Confidence, Feasibility, Positive Outcomes**

Use for feasibility indicators, success states, skill outcomes, achievement markers, and confidence scores.

Represents positive validation and achievable goals.

Do not use for generic "go" actions or decorative green elements.

**Match Cyan #22D3EE - Personalization, User-Specific Content**

Use for personalized features, user-specific recommendations, content matched to user inputs, and customized suggestions.

Represents content tailored specifically to the individual user.

Only use for truly personalized or user-matched content.

**Guidance Yellow #FACC15 - Tips, Reassurance, Helpful Guidance**

Use for tooltips, helper text, reassurance messages, tips and tricks, and "don't worry" messaging.

Represents friendly guidance and support without pressure.

Do not use for warnings or alerts - those should be orange or red.

### Color Combinations

Primary gradient combines Deep Blue to Match Cyan for brand identity and main CTAs.

AI gradient combines AI Purple to Match Cyan for AI-powered features.

Text on colored backgrounds must maintain WCAG AA contrast ratios minimum.

Never combine more than two semantic colors in a single element.

---

## Typography System

### Base Settings

Base font size is 16 pixels for optimal readability.

Line height is 1.5 for body text and 1.2 for headings.

Font weight is 500 medium for headings and 400 normal for body text.

### Heading Hierarchy

Use semantic HTML heading tags h1 through h6 for proper document structure.

Only one h1 per page representing the main page title.

Maintain logical heading hierarchy without skipping levels.

Do not use Tailwind font size or weight classes unless specifically needed. Default typography is handled in globals.css.

### Responsive Typography

Text scales appropriately across breakpoints using responsive patterns.

Mobile uses smaller sizes for space efficiency.

Desktop uses larger sizes for improved readability at distance.

Never let text overflow containers - use proper wrapping or ellipsis.

---

## Layout and Spacing

### Responsive Grid System

Use Tailwind's grid system with responsive breakpoints at sm: 640px, md: 768px, lg: 1024px, and xl: 1280px.

Mobile-first approach with base styles for mobile, then media queries for larger screens.

Grid columns reduce from multi-column on desktop to single column on mobile.

Never force horizontal scrolling on any screen size.

### Spacing Scale

Use consistent spacing values following 4-pixel base unit.

Small spacing uses 0.5rem or 1rem (8px or 16px).

Medium spacing uses 1.5rem or 2rem (24px or 32px).

Large spacing uses 3rem or 4rem (48px or 64px).

Reduce spacing proportionally on smaller screens.

### Container Guidelines

Use container class for centered content with max-width.

Apply horizontal padding of px-4 on mobile, px-6 on tablet, and px-8 on desktop.

Maintain consistent padding within cards and sections.

Never let content touch screen edges without padding.

---

## Component Patterns

### Button Guidelines

Primary buttons use gradient background from Deep Blue to Match Cyan for main actions.

Secondary buttons use outline style with transparent background for supporting actions.

Tertiary buttons use text-only style for least important actions.

Button text must be clear and action-oriented like "Generate Idea" not "Submit".

Touch targets minimum 44x44 pixels on mobile for accessibility.

### Card Components

Cards use white background with subtle shadow for elevation.

Border radius of rounded-2xl (16px) for modern appearance.

Hover states include lift effect with translateY and increased shadow.

Cards maintain consistent padding of p-6 or p-8.

Never nest cards more than two levels deep.

### Form Elements

Input fields minimum height 44px for touch accessibility.

Labels positioned above inputs with clear hierarchy.

Error messages in red below inputs with helpful guidance.

Disabled states clearly indicated with reduced opacity.

Focus states use outline with brand color.

### Navigation Patterns

Navbar sticky at top with glassmorphic backdrop blur.

Mobile navigation uses hamburger menu at md breakpoint and below.

Desktop navigation shows all links horizontally.

Active page indicated with different color or underline.

Navigation items minimum 44px height for touch targets.

---

## Animation and Interaction

### Animation Principles

Animations serve functional purpose, never purely decorative.

Duration ranges from 200ms for micro-interactions to 500ms for major transitions.

Easing uses ease-out for entering elements and ease-in for exiting elements.

Respect prefers-reduced-motion for accessibility.

### Hover States

Cards lift slightly with translateY on hover.

Shadows increase on hover for depth perception.

Color transitions smooth at 200-300ms duration.

Scale changes subtle at 1.02 or 1.05 maximum.

### Loading States

Use skeleton screens for content placeholders during loading.

Spinner animations for actions in progress.

Progress bars for multi-step processes.

Never leave users wondering if something is happening.

---

## Accessibility Requirements

### Color Contrast

All text maintains WCAG AA contrast ratio minimum of 4.5:1.

Large text can use 3:1 contrast ratio.

Interactive elements clearly distinguishable from non-interactive.

Never rely on color alone to convey information.

### Keyboard Navigation

All interactive elements keyboard accessible.

Focus states clearly visible with outline.

Tab order follows logical reading order.

Escape key closes modals and menus.

### Screen Reader Support

Semantic HTML for proper structure.

ARIA labels for icon-only buttons.

Alt text for all images conveying meaning.

Skip links for main content navigation.

---

## Mobile-Specific Guidelines

### Touch Targets

Minimum 44x44 pixels for all interactive elements.

Adequate spacing between touch targets to prevent mis-taps.

Larger buttons for primary actions.

### Mobile Navigation

Hamburger menu appears at md breakpoint and below.

Menu full-width or slide-out drawer pattern.

Close button clearly visible in menu.

Smooth animation for menu opening and closing.

### Mobile Layout

Single-column layout for most content.

Reduce padding and margins appropriately.

Stack elements vertically instead of horizontally.

Hide non-essential elements if needed for clarity.

### Performance on Mobile

Optimize images for mobile bandwidth.

Lazy load off-screen content.

Minimize JavaScript bundle size.

Prioritize critical rendering path.

---

## Content Guidelines

### Writing Style

Use conversational, friendly tone throughout.

Active voice preferred over passive.

Short sentences for better readability.

"You" and "your" for personal connection.

### Messaging Tone

Beginner content uses simple, reassuring language.

Intermediate content uses more technical terms appropriately.

Advanced content uses professional terminology.

Always explain benefits, not just features.

### Error Messages

Clear explanation of what went wrong.

Helpful guidance on how to fix it.

Friendly tone without blame.

Actionable next steps provided.

---

## Performance Guidelines

### Loading Performance

Critical CSS inlined for above-the-fold content.

Lazy load below-the-fold images and components.

Code splitting for route-based chunks.

Minify and compress all assets.

### Runtime Performance

Avoid unnecessary re-renders with proper React optimization.

Debounce user input handlers where appropriate.

Use CSS transforms for animations instead of layout properties.

Virtualize long lists if needed.

### Bundle Size

Remove unused dependencies and code.

Tree-shake imports to include only what's needed.

Analyze bundle size regularly and optimize.

Consider code splitting for large features.

---

## Testing Guidelines

### Component Testing

Test user interactions and behavior.

Test accessibility with screen readers.

Test responsive behavior at various breakpoints.

Test error states and edge cases.

### Visual Regression

Test design system consistency.

Verify color usage follows semantic rules.

Check spacing and typography across components.

Validate responsive layouts.

---

## Documentation Standards

### Code Comments

Explain why, not what the code does.

Document complex algorithms and business logic.

Link to relevant external documentation when appropriate.

Keep comments up-to-date with code changes.

### Component Documentation

Props interface with clear descriptions.

Usage examples for common scenarios.

Accessibility considerations noted.

Dependencies and requirements listed.

---

**Version:** 1.0.0  
**Status:** Active Design System  
**Last Updated:** January 2025

These guidelines are living documents and should be updated as the design system evolves. All team members are responsible for maintaining consistency with these guidelines.
