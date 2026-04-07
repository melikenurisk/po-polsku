# Tasks

## Phase 1: Data & Vocabulary Organization (COMPLETE)
> Goal: Parse all vocabulary and categorize by theme and word type

- [x] Create a structured data file (JSON) with all vocabulary entries
- [x] Generate a themed vocabulary reference (HTML)

## Phase 2: Grammar & Study Topics Book (COMPLETE)
> Goal: Extract and organize all grammar patterns into a reference book

- [x] Analyze all sentences and vocabulary to identify grammar topics
- [x] Create a Polish Grammar Book (HTML) with A1→A2 progression

## Phase 3: Interactive Quizzes (COMPLETE)
> Goal: Build interactive HTML quizzes to practice vocabulary and grammar

- [x] Create Polish-to-English quiz
- [x] Create English-to-Polish quiz
- [x] Create grammar quiz
- [x] Build main dashboard/index page

## Phase 4: Platform Redesign — Shared Foundation
> Goal: Unify design system, navigation, dark mode, and responsiveness across all pages

- [x] Create shared CSS (base.css, components.css, layout.css) with unified design tokens, typography, breakpoints
- [x] Create shared JS (shared.js) with unified navigation, dark mode (single localStorage key), breadcrumbs
- [x] Refactor index.html to use shared assets
- [x] Refactor vocabulary.html to use shared assets
- [x] Refactor grammar.html to use shared assets (sidebar + top nav coexistence)
- [x] Refactor quiz-pl-en.html to use shared assets
- [x] Refactor quiz-en-pl.html to use shared assets
- [x] Refactor quiz-grammar.html to use shared assets

## Phase 5: Platform Redesign — Polish & Consistency
> Goal: Fix remaining UI inconsistencies, improve mobile experience, add cross-links

- [x] Audit and fix visual regressions across all pages after shared CSS integration
- [x] Improve mobile layouts on all quiz pages (standardized breakpoints)
- [x] Add cross-links between related content (grammar→vocab, quiz results→weak topics)
- [x] Consolidate vocabulary data into single js/vocabulary-data.js used by all pages
- [x] Improve accessibility (ARIA labels, form labels, focus indicators)
- [x] Final visual polish pass (consistent spacing, card styles, animations)
