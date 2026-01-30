import { LinearClient } from "@linear/sdk";

const client = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

const TEAM_ID = "dcabbd6c-d519-4004-a863-d0830a4c2ba7"; // OSD

// Existing labels
const EXISTING_LABELS = {
  "agent:coder": "2f8b73a5-7dd3-4929-83b1-9041e754a56a",
  "agent:tester": "9538ff91-b549-41b5-8713-e65899962f2b",
  "agent:reviewer": "239673ce-627f-4022-84fb-caf3166a11ce",
  "P1-High": "e94686e6-a07c-4c28-bd57-f5c1d73b039e",
  "P2-Medium": "d4441f93-61f0-41b6-96fa-458de356ba4b",
  "Feature": "8a83f287-ba1d-458e-bb93-cad59c0af6fb",
};

// Labels to create
const NEW_LABELS = [
  { name: "agent:system-architect", color: "#9B51E0" },
  { name: "agent:cicd-engineer", color: "#F2994A" },
  { name: "phase:foundation", color: "#6FCF97" },
  { name: "phase:core-logic", color: "#56CCF2" },
  { name: "phase:components", color: "#BB87FC" },
  { name: "phase:speech", color: "#F2C94C" },
  { name: "phase:polish", color: "#EB5757" },
  { name: "phase:testing", color: "#27AE60" },
  { name: "phase:deployment", color: "#2F80ED" },
  { name: "size:S", color: "#6FCF97" },
  { name: "size:M", color: "#F2C94C" },
  { name: "size:L", color: "#F2994A" },
];

// Issues to create (sized for <150k tokens each)
const ISSUES = [
  // Phase 1: Foundation
  {
    title: "Setup project configuration files",
    description: `## Overview
Create and configure all project configuration files for the Vite + React + TypeScript + Tailwind stack.

## Files to Create
- \`index.html\` - HTML entry point with root div and meta tags
- \`tsconfig.json\` - TypeScript config (strict mode, React JSX)
- \`tsconfig.node.json\` - Node config for Vite
- \`vite.config.ts\` - Vite configuration with React plugin
- \`tailwind.config.js\` - Tailwind CSS configuration
- \`postcss.config.js\` - PostCSS with Tailwind/Autoprefixer
- \`src/vite-env.d.ts\` - Vite type declarations

## Acceptance Criteria
- [ ] All config files created and valid
- [ ] TypeScript strict mode enabled
- [ ] Tailwind content paths configured
- [ ] Vite dev server runs without errors

## Token Estimate
~30k tokens`,
    labels: ["agent:system-architect", "phase:foundation", "size:M", "P1-High"],
  },
  {
    title: "Create TypeScript type definitions",
    description: `## Overview
Define all TypeScript interfaces and types for the Meeting Bingo game.

## File: src/types/index.ts

## Types to Define
- \`CategoryId\` - Union type for category IDs ('agile' | 'corporate' | 'tech')
- \`Category\` - Interface for category with id, name, description, icon, words
- \`BingoSquare\` - Interface for individual square (id, word, isFilled, isAutoFilled, isFreeSpace, filledAt, row, col)
- \`BingoCard\` - Interface for card (squares 5x5 grid, words flat list)
- \`GameStatus\` - Union type ('idle' | 'setup' | 'playing' | 'won')
- \`WinningLine\` - Interface for winning line (type, index, squares)
- \`GameState\` - Interface for full game state
- \`SpeechRecognitionState\` - Interface for speech API state
- \`Toast\` - Interface for notifications

## Acceptance Criteria
- [ ] All types exported from index.ts
- [ ] Types match architecture doc exactly
- [ ] No TypeScript errors

## Token Estimate
~20k tokens`,
    labels: ["agent:system-architect", "phase:foundation", "size:S", "P1-High"],
  },
  {
    title: "Create project directory structure",
    description: `## Overview
Set up the complete project directory structure with placeholder files.

## Directory Structure
\`\`\`
src/
├── main.tsx                    # App entry point
├── App.tsx                     # Root component placeholder
├── index.css                   # Tailwind imports
├── components/
│   └── ui/
├── hooks/
├── lib/
├── data/
├── types/
└── context/
public/
└── favicon.svg
\`\`\`

## Files to Create
- \`src/main.tsx\` - ReactDOM.createRoot render
- \`src/App.tsx\` - Basic App component shell
- \`src/index.css\` - @tailwind base/components/utilities
- \`public/favicon.svg\` - Simple bingo card icon

## Acceptance Criteria
- [ ] All directories created
- [ ] Entry files have valid boilerplate
- [ ] App renders "Meeting Bingo" text

## Token Estimate
~25k tokens`,
    labels: ["agent:system-architect", "phase:foundation", "size:M", "P1-High"],
  },
  {
    title: "Create category buzzword data",
    description: `## Overview
Create the buzzword category data file with 45+ words per category.

## File: src/data/categories.ts

## Categories
1. **Agile & Scrum** (id: 'agile')
   - Words: sprint, backlog, standup, retrospective, velocity, blocker, story points, epic, user story, scrum master, product owner, kanban, burndown, refinement, iteration, acceptance criteria, definition of done, capacity, throughput, cycle time, lead time, swimlane, ceremony, timeboxed, increment, artifact, transparency, inspection, adaptation, self-organizing, cross-functional, servant leader, impediment, spike, technical debt, refactor, MVP, release, deployment, continuous integration, CI/CD, demo, stakeholder, prioritize, scope creep

2. **Corporate Speak** (id: 'corporate')
   - Words: synergy, leverage, circle back, take offline, bandwidth, low-hanging fruit, move the needle, deep dive, touch base, action item, deliverable, stakeholder, alignment, visibility, paradigm shift, best practice, value proposition, ROI, bottom line, top of mind, streamline, optimize, scalable, proactive, holistic, robust, ecosystem, pivot, disruption, innovation, thought leader, core competency, mission critical, game changer, win-win, net-net, helicopter view, granular, drill down, boil the ocean, bleeding edge, north star, parking lot, table this, unpack

3. **Tech & Engineering** (id: 'tech')
   - Words: API, cloud, microservices, serverless, containerized, kubernetes, docker, CI/CD, pipeline, deployment, scalability, latency, throughput, database, schema, migration, refactor, technical debt, architecture, infrastructure, DevOps, observability, monitoring, alerting, incident, postmortem, SLA, uptime, performance, optimization, caching, load balancing, security, authentication, authorization, encryption, compliance, audit, code review, pull request, merge, branch, release, rollback, feature flag

## Acceptance Criteria
- [ ] Each category has 45+ unique words
- [ ] Words are lowercase strings
- [ ] File exports CATEGORIES array
- [ ] Types match Category interface

## Token Estimate
~20k tokens`,
    labels: ["agent:coder", "phase:foundation", "size:S", "P1-High"],
  },
  {
    title: "Create utility functions",
    description: `## Overview
Create utility functions including the className merger.

## File: src/lib/utils.ts

## Functions to Implement
1. \`cn(...inputs)\` - Merge Tailwind classes using clsx + tailwind-merge
   - Handles conditional classes
   - Deduplicates conflicting Tailwind classes
   - Example: cn("px-4", condition && "px-8") => "px-8" if condition

## Dependencies to Add
- clsx
- tailwind-merge

## Acceptance Criteria
- [ ] cn() function works correctly
- [ ] Tailwind class conflicts resolved
- [ ] TypeScript types correct

## Token Estimate
~15k tokens`,
    labels: ["agent:coder", "phase:foundation", "size:S", "P2-Medium"],
  },

  // Phase 2: Core Game Logic
  {
    title: "Implement card generator logic",
    description: `## Overview
Create the bingo card generation logic with Fisher-Yates shuffle.

## File: src/lib/cardGenerator.ts

## Functions to Implement

### shuffle<T>(array: T[]): T[]
- Fisher-Yates shuffle algorithm
- Returns new shuffled array (does not mutate input)
- O(n) time complexity

### generateCard(categoryId: CategoryId): BingoCard
- Get category from CATEGORIES by ID
- Shuffle words array
- Pick first 24 words
- Build 5x5 grid of BingoSquare objects
- Center square (2,2) is FREE space (pre-filled)
- Each square has: id (row-col), word, isFilled, isAutoFilled, isFreeSpace, filledAt, row, col

### getCardWords(card: BingoCard): string[]
- Return flat array of card words (excluding FREE)
- Used for word detection

## Acceptance Criteria
- [ ] shuffle() produces random order
- [ ] generateCard() returns valid 5x5 grid
- [ ] Center square is FREE and pre-filled
- [ ] 24 unique words selected
- [ ] TypeScript types correct

## Token Estimate
~35k tokens`,
    labels: ["agent:coder", "phase:core-logic", "size:M", "P1-High"],
  },
  {
    title: "Implement bingo checker logic",
    description: `## Overview
Create the win condition checking logic for rows, columns, and diagonals.

## File: src/lib/bingoChecker.ts

## Functions to Implement

### checkForBingo(card: BingoCard): WinningLine | null
- Check all 5 rows for complete fill
- Check all 5 columns for complete fill
- Check both diagonals (top-left to bottom-right, top-right to bottom-left)
- Return first winning line found, or null
- WinningLine includes: type, index, squares (IDs)

### countFilled(card: BingoCard): number
- Return count of filled squares
- Used for progress tracking

### getClosestToWin(card: BingoCard): { needed: number; line: string } | null
- Check all 12 possible lines
- Return the line closest to completion
- Used for UI hints (e.g., "1 more for Row 3!")

## Acceptance Criteria
- [ ] All win conditions detected
- [ ] Returns correct WinningLine
- [ ] countFilled accurate
- [ ] getClosestToWin finds best line

## Token Estimate
~40k tokens`,
    labels: ["agent:coder", "phase:core-logic", "size:M", "P1-High"],
  },
  {
    title: "Implement word detector logic",
    description: `## Overview
Create the word detection logic for matching transcript to card words.

## File: src/lib/wordDetector.ts

## Functions to Implement

### escapeRegex(string: string): string
- Escape special regex characters
- Prevents injection issues

### normalizeText(text: string): string
- Convert to lowercase
- Normalize quotes (' → ')
- Trim whitespace

### detectWords(transcript, cardWords, alreadyFilled): string[]
- Find card words in transcript
- Skip already filled words
- Handle multi-word phrases (direct substring match)
- Handle single words (word boundary regex)
- Return array of detected words

### WORD_ALIASES: Record<string, string[]>
- Map common variations: ci/cd → [cicd, continuous integration]
- mvp → [minimum viable product, m.v.p.]
- roi → [return on investment, r.o.i.]

### detectWordsWithAliases(transcript, cardWords, alreadyFilled): string[]
- Enhanced detection including aliases
- Check main word first, then aliases

## Acceptance Criteria
- [ ] Single words detected with boundaries
- [ ] Multi-word phrases detected
- [ ] Aliases expand detection
- [ ] Already filled words skipped
- [ ] Case insensitive matching

## Token Estimate
~40k tokens`,
    labels: ["agent:coder", "phase:core-logic", "size:M", "P1-High"],
  },

  // Phase 3: React Components
  {
    title: "Create UI base components",
    description: `## Overview
Create reusable UI components for buttons and cards.

## Files to Create

### src/components/ui/Button.tsx
- Variants: primary, secondary, ghost
- Sizes: sm, md, lg
- Props: children, onClick, disabled, variant, size, className
- Uses cn() for class merging
- Includes hover/active states

### src/components/ui/Card.tsx
- Container card component
- Props: children, className
- Default styling: rounded-lg, shadow, bg-white, p-4

## Acceptance Criteria
- [ ] Button renders all variants
- [ ] Button handles disabled state
- [ ] Card provides consistent styling
- [ ] Components are accessible

## Token Estimate
~25k tokens`,
    labels: ["agent:coder", "phase:components", "size:S", "P2-Medium"],
  },
  {
    title: "Create LandingPage component",
    description: `## Overview
Create the welcome/landing page shown on app load.

## File: src/components/LandingPage.tsx

## Props
- onStart: () => void

## UI Elements
- Hero section with title "Meeting Bingo"
- Subtitle: "Turn boring meetings into a game!"
- Description paragraph explaining the game
- "Start Playing" button (primary, large)
- Fun emoji decorations (🎯, 📊, 💼)

## Design
- Centered content
- Gradient or solid background
- Responsive (mobile-friendly)
- Animated entrance (optional)

## Acceptance Criteria
- [ ] Title and description display
- [ ] Start button triggers onStart
- [ ] Responsive on mobile
- [ ] Visually appealing

## Token Estimate
~25k tokens`,
    labels: ["agent:coder", "phase:components", "size:S", "P1-High"],
  },
  {
    title: "Create CategorySelect component",
    description: `## Overview
Create the category selection screen.

## File: src/components/CategorySelect.tsx

## Props
- onSelect: (categoryId: CategoryId) => void
- onBack: () => void

## UI Elements
- Back button (top left)
- Title: "Choose Your Category"
- 3 category cards in grid:
  - Agile & Scrum (🏃)
  - Corporate Speak (💼)
  - Tech & Engineering (💻)
- Each card shows: icon, name, description
- Hover effects on cards

## Behavior
- Click card → onSelect(categoryId)
- Click back → onBack()

## Acceptance Criteria
- [ ] All 3 categories displayed
- [ ] Cards are clickable
- [ ] Hover states work
- [ ] Back navigation works
- [ ] Responsive grid

## Token Estimate
~30k tokens`,
    labels: ["agent:coder", "phase:components", "size:M", "P1-High"],
  },
  {
    title: "Create BingoSquare component",
    description: `## Overview
Create the individual bingo square component.

## File: src/components/BingoSquare.tsx

## Props
- square: BingoSquare
- isWinningSquare: boolean
- onClick: () => void

## States to Handle
1. **Default** - White bg, gray border
2. **Filled** - Blue bg, white text, strikethrough
3. **Auto-filled** - Same as filled + pulse animation
4. **Free Space** - Amber bg, star icon, not clickable
5. **Winning** - Green bg, ring highlight

## Styling
- aspect-square (1:1 ratio)
- Text size responsive (xs on mobile, sm on desktop)
- Word wrapping for long phrases
- Hover scale effect
- Active press effect

## Acceptance Criteria
- [ ] All states render correctly
- [ ] Click handler fires (except FREE)
- [ ] Responsive text sizing
- [ ] Animations smooth

## Token Estimate
~30k tokens`,
    labels: ["agent:coder", "phase:components", "size:M", "P1-High"],
  },
  {
    title: "Create BingoCard component",
    description: `## Overview
Create the 5x5 bingo card grid container.

## File: src/components/BingoCard.tsx

## Props
- card: BingoCard
- winningSquares: Set<string> (IDs of winning squares)
- onSquareClick: (row: number, col: number) => void

## Layout
- 5x5 CSS Grid
- Gap between squares
- Max width constraint
- Centered in container

## Behavior
- Map squares to BingoSquare components
- Pass isWinningSquare based on winningSquares set
- Propagate click events with row/col

## Acceptance Criteria
- [ ] 5x5 grid displays correctly
- [ ] Winning squares highlighted
- [ ] Click events propagate
- [ ] Responsive sizing

## Token Estimate
~25k tokens`,
    labels: ["agent:coder", "phase:components", "size:S", "P1-High"],
  },
  {
    title: "Create GameControls component",
    description: `## Overview
Create the game control buttons panel.

## File: src/components/GameControls.tsx

## Props
- isListening: boolean
- isSupported: boolean
- onToggleListening: () => void
- onNewCard: () => void
- filledCount: number

## UI Elements
1. Listen/Pause button
   - Shows "🎤 Start Listening" or "⏸️ Pause"
   - Disabled if speech not supported
   - Primary when not listening, secondary when listening
2. New Card button
   - Shows "🔄 New Card"
   - Confirms before regenerating
3. Progress indicator
   - Shows "X/25 filled"

## Acceptance Criteria
- [ ] Toggle button changes state
- [ ] Unsupported state handled
- [ ] New card with confirmation
- [ ] Progress displays correctly

## Token Estimate
~30k tokens`,
    labels: ["agent:coder", "phase:components", "size:M", "P2-Medium"],
  },
  {
    title: "Create TranscriptPanel component",
    description: `## Overview
Create the live transcript display panel.

## File: src/components/TranscriptPanel.tsx

## Props
- transcript: string
- interimTranscript: string
- detectedWords: string[]
- isListening: boolean

## UI Elements
1. Status indicator
   - Pulsing red dot when listening
   - Gray dot when paused
   - Label: "🎤 Listening..." or "🎤 Paused"
2. Transcript display
   - Show last ~100 characters
   - Final text in dark color
   - Interim text in gray italic
3. Detected words chips
   - Last 5 detected words
   - Green background chips
   - ✨ emoji prefix

## Acceptance Criteria
- [ ] Status indicator accurate
- [ ] Transcript truncates correctly
- [ ] Interim results shown differently
- [ ] Detected words display

## Token Estimate
~25k tokens`,
    labels: ["agent:coder", "phase:components", "size:S", "P1-High"],
  },
  {
    title: "Create GameBoard container component",
    description: `## Overview
Create the main game container that orchestrates all game UI.

## File: src/components/GameBoard.tsx

## Props
- game: GameState
- setGame: React.Dispatch<SetStateAction<GameState>>
- onWin: (winningLine: WinningLine, winningWord: string) => void

## Composition
- GameControls (top)
- BingoCard (center)
- TranscriptPanel (bottom)

## Responsibilities
- Initialize speech recognition
- Handle square clicks (manual fill/unfill)
- Process transcript for word detection
- Check for bingo after each fill
- Trigger onWin when bingo detected

## State Management
- Track detected words array
- Track transcript history
- Update game state on fills

## Acceptance Criteria
- [ ] All sub-components render
- [ ] Manual clicks work
- [ ] Speech integration works
- [ ] Win detection triggers

## Token Estimate
~50k tokens`,
    labels: ["agent:coder", "phase:components", "size:L", "P1-High"],
  },
  {
    title: "Create WinScreen component",
    description: `## Overview
Create the victory celebration screen.

## File: src/components/WinScreen.tsx

## Props
- game: GameState
- onPlayAgain: () => void
- onHome: () => void

## UI Elements
1. Confetti animation (trigger on mount)
2. "BINGO!" title (large, animated)
3. Winning word highlight
4. Game stats:
   - Time to win
   - Squares filled
   - Winning line type
5. Action buttons:
   - "Play Again" (primary)
   - "Back to Home" (secondary)
6. Share button (optional)

## Animations
- Bounce-in for title
- Confetti burst
- Stats count-up (optional)

## Acceptance Criteria
- [ ] Confetti plays on mount
- [ ] Stats calculated correctly
- [ ] Buttons navigate correctly
- [ ] Responsive layout

## Token Estimate
~35k tokens`,
    labels: ["agent:coder", "phase:components", "size:M", "P1-High"],
  },
  {
    title: "Implement App component with screen routing",
    description: `## Overview
Implement the main App component with screen state management.

## File: src/App.tsx

## Screens
- 'landing' → LandingPage
- 'category' → CategorySelect
- 'game' → GameBoard
- 'win' → WinScreen

## State
- screen: Screen (union type)
- game: GameState

## Handlers
- handleStart: landing → category
- handleCategorySelect: category → game (with card generation)
- handleWin: game → win (with winning data)
- handlePlayAgain: win → category
- handleBackToHome: win/category → landing

## Acceptance Criteria
- [ ] All screens reachable
- [ ] State resets appropriately
- [ ] Game state persists during game
- [ ] Clean transitions

## Token Estimate
~35k tokens`,
    labels: ["agent:coder", "phase:components", "size:M", "P1-High"],
  },

  // Phase 4: Speech Recognition
  {
    title: "Implement useSpeechRecognition hook",
    description: `## Overview
Create the Web Speech API wrapper hook.

## File: src/hooks/useSpeechRecognition.ts

## Implementation

### Browser API Setup
- Get SpeechRecognition constructor (with webkit prefix fallback)
- Configure: continuous=true, interimResults=true, lang='en-US'

### Event Handlers
- onresult: Parse results, separate final/interim, update state, call callback
- onerror: Set error state, stop listening
- onend: Auto-restart if still supposed to be listening

### Returned Interface
- State: isSupported, isListening, transcript, interimTranscript, error
- Methods: startListening(callback?), stopListening(), resetTranscript()

## Edge Cases
- Browser doesn't support Speech API
- Permission denied
- Network errors
- Auto-restart on end

## Acceptance Criteria
- [ ] Works in Chrome
- [ ] Graceful fallback if unsupported
- [ ] Auto-restart works
- [ ] Callbacks fire correctly

## Token Estimate
~45k tokens`,
    labels: ["agent:coder", "phase:speech", "size:L", "P1-High"],
  },
  {
    title: "Implement useGame hook",
    description: `## Overview
Create the game state management hook.

## File: src/hooks/useGame.ts

## State
- Full GameState object
- Detected words history
- Last transcript processed

## Methods

### toggleSquare(row, col)
- Manual fill/unfill
- Skip FREE space
- Update filledCount
- Check for bingo

### processTranscript(newTranscript)
- Get card words
- Get already filled words
- Detect words in transcript
- Fill detected squares
- Check for bingo after each

### checkBingo()
- Call checkForBingo
- If winning, set winningLine and trigger callback

### resetGame()
- Clear all state
- Generate new card

## Acceptance Criteria
- [ ] Manual toggle works
- [ ] Auto-fill works
- [ ] Bingo detection integrated
- [ ] State updates correctly

## Token Estimate
~40k tokens`,
    labels: ["agent:coder", "phase:speech", "size:M", "P1-High"],
  },
  {
    title: "Implement useLocalStorage hook",
    description: `## Overview
Create a generic localStorage persistence hook.

## File: src/hooks/useLocalStorage.ts

## Interface
\`\`\`typescript
function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void]
\`\`\`

## Implementation
- Read from localStorage on mount
- Parse JSON (with try/catch)
- Return default if not found or error
- Setter writes to localStorage as JSON
- Handle SSR (check window exists)

## Acceptance Criteria
- [ ] Reads existing values
- [ ] Writes new values
- [ ] Handles parse errors gracefully
- [ ] Works with complex objects

## Token Estimate
~20k tokens`,
    labels: ["agent:coder", "phase:speech", "size:S", "P2-Medium"],
  },

  // Phase 5: Polish
  {
    title: "Implement confetti celebration",
    description: `## Overview
Create the confetti animation utility.

## File: src/lib/confetti.ts

## Implementation
- Import canvas-confetti
- triggerConfetti() function
- Multiple bursts for dramatic effect
- Custom colors matching app theme

## Configuration
\`\`\`typescript
{
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#3B82F6', '#10B981', '#F59E0B']
}
\`\`\`

## Acceptance Criteria
- [ ] Confetti animates on call
- [ ] Colors match brand
- [ ] Performance acceptable
- [ ] Cleans up after animation

## Token Estimate
~15k tokens`,
    labels: ["agent:coder", "phase:polish", "size:S", "P2-Medium"],
  },
  {
    title: "Implement share functionality",
    description: `## Overview
Create sharing utilities for win screen.

## File: src/lib/shareUtils.ts

## Functions

### generateShareText(game: GameState): string
Generate shareable text:
\`\`\`
🎯 BINGO! I won Meeting Bingo!
⏱️ Time: 5m 23s
✅ Squares: 12/25
🏆 Winning word: "synergy"
Play at: meetingbingo.vercel.app
\`\`\`

### shareResult(game: GameState): Promise<void>
- Try Web Share API first (mobile)
- Fallback to clipboard copy
- Show toast notification

## Acceptance Criteria
- [ ] Share text is engaging
- [ ] Web Share works on mobile
- [ ] Clipboard fallback works
- [ ] User feedback provided

## Token Estimate
~20k tokens`,
    labels: ["agent:coder", "phase:polish", "size:S", "P2-Medium"],
  },
  {
    title: "Add favicon and meta tags",
    description: `## Overview
Create favicon and update HTML meta tags.

## Files

### public/favicon.svg
Simple bingo card icon:
- 3x3 grid
- Some cells filled
- Brand colors

### index.html updates
- Title: "Meeting Bingo"
- Description meta tag
- OG tags for social sharing
- Theme color
- Viewport settings

## Acceptance Criteria
- [ ] Favicon displays in browser tab
- [ ] Social previews work
- [ ] Mobile viewport correct

## Token Estimate
~15k tokens`,
    labels: ["agent:coder", "phase:polish", "size:S", "P2-Medium"],
  },

  // Phase 6: Testing
  {
    title: "Install dependencies and verify build",
    description: `## Overview
Install all npm dependencies and verify the project builds.

## Commands (in Docker)
\`\`\`bash
docker exec meeting-bingo-dev-1 npm install
docker exec meeting-bingo-dev-1 npm install clsx tailwind-merge
docker exec meeting-bingo-dev-1 npm run typecheck
docker exec meeting-bingo-dev-1 npm run build
\`\`\`

## Verification
- No TypeScript errors
- No build errors
- dist/ folder created
- All assets bundled

## Acceptance Criteria
- [ ] npm install succeeds
- [ ] TypeScript passes
- [ ] Build completes
- [ ] Output is valid

## Token Estimate
~25k tokens`,
    labels: ["agent:tester", "phase:testing", "size:M", "P1-High"],
  },
  {
    title: "Manual testing checklist",
    description: `## Overview
Execute manual testing checklist for all features.

## Pre-Meeting Test
- [ ] App loads on Chrome at localhost:5173
- [ ] Landing page displays correctly
- [ ] Category selection works
- [ ] Card generates with 24 unique words
- [ ] Free space is pre-filled (center)
- [ ] Manual tap fills squares
- [ ] Manual tap unfills squares
- [ ] BINGO triggers on 5-in-a-row (row)
- [ ] BINGO triggers on 5-in-a-row (column)
- [ ] BINGO triggers on 5-in-a-row (diagonal)

## Speech Test
- [ ] Microphone permission requested
- [ ] Listening indicator shows (pulsing)
- [ ] Transcript displays spoken text
- [ ] Buzzwords auto-fill squares
- [ ] Multiple words detected in sentence
- [ ] Stopping/starting works

## Win Test
- [ ] Confetti plays on win
- [ ] Winning line highlighted in green
- [ ] Game stats displayed correctly
- [ ] Share button works (clipboard)
- [ ] Play again resets game
- [ ] Home button returns to landing

## Responsive Test
- [ ] Mobile layout works (375px)
- [ ] Tablet layout works (768px)
- [ ] Desktop layout works (1024px+)

## Acceptance Criteria
- [ ] All checklist items pass
- [ ] No console errors
- [ ] No visual bugs

## Token Estimate
~30k tokens`,
    labels: ["agent:tester", "phase:testing", "size:M", "P1-High"],
  },

  // Phase 7: Deployment
  {
    title: "Configure and deploy to Vercel",
    description: `## Overview
Configure Vercel and deploy the production build.

## Files to Create

### vercel.json
\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
\`\`\`

## Deployment Steps
1. Install Vercel CLI (on host): \`npm i -g vercel\`
2. Login: \`vercel login\`
3. Deploy: \`vercel --prod\`
4. Verify deployment URL works

## Post-Deploy Verification
- [ ] Site loads on Vercel URL
- [ ] All features work in production
- [ ] HTTPS enabled
- [ ] No console errors

## Acceptance Criteria
- [ ] vercel.json created
- [ ] Deployment succeeds
- [ ] Production URL accessible
- [ ] All features functional

## Token Estimate
~25k tokens`,
    labels: ["agent:cicd-engineer", "phase:deployment", "size:M", "P1-High"],
  },
];

async function main() {
  console.log("🚀 Creating Meeting Bingo project in Linear...\n");

  // Step 1: Create missing labels
  console.log("📋 Creating labels...");
  const labelIds: Record<string, string> = { ...EXISTING_LABELS };

  for (const label of NEW_LABELS) {
    try {
      const existingLabels = await client.issueLabels({
        filter: { name: { eq: label.name } },
      });
      if (existingLabels.nodes.length > 0) {
        labelIds[label.name] = existingLabels.nodes[0].id;
        console.log(`  ✓ Label exists: ${label.name}`);
      } else {
        const created = await client.createIssueLabel({
          name: label.name,
          color: label.color,
          teamId: TEAM_ID,
        });
        const createdLabel = await created.issueLabel;
        if (createdLabel) {
          labelIds[label.name] = createdLabel.id;
          console.log(`  ✓ Created: ${label.name}`);
        }
      }
    } catch (e: any) {
      console.log(`  ⚠ Label ${label.name}: ${e.message}`);
    }
  }

  // Step 2: Create project
  console.log("\n📁 Creating project...");
  const projectResult = await client.createProject({
    name: "Meeting Bingo MVP",
    description: `# Meeting Bingo MVP

A browser-based bingo game with live audio transcription for making meetings more engaging.

## Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Web Speech API (transcription)
- Vercel (deployment)

## Goals
- Build a functional MVP in Docker
- Deploy to Vercel
- Zero-cost infrastructure

## Resources
- [Architecture Plan](docs/architecture/meeting-bingo-architecture.md)
- [Implementation Plan](docs/implementation-plan.md)
- [PRD](docs/product/meeting-bingo-prd.md)
- [UX Research](docs/research/meeting-bingo-uxr.md)

## Execution
Issues are sized for claude-flow agent execution (<150k tokens each).
Labels indicate assigned agent and phase.`,
    teamIds: [TEAM_ID],
    state: "planned",
  });
  const project = await projectResult.project;
  if (!project) {
    throw new Error("Failed to create project");
  }
  console.log(`  ✓ Created project: ${project.name} (${project.id})`);

  // Step 3: Create issues
  console.log("\n📝 Creating issues...");
  const createdIssues: { id: string; identifier: string; title: string }[] = [];

  for (const issue of ISSUES) {
    try {
      const issueLabelIds = issue.labels
        .map((l) => labelIds[l])
        .filter(Boolean);

      const result = await client.createIssue({
        title: issue.title,
        description: issue.description,
        teamId: TEAM_ID,
        projectId: project.id,
        labelIds: issueLabelIds,
        stateId: "3efbbbab-bf1e-4af8-91a5-7c79fcbd611e", // Backlog
      });
      const createdIssue = await result.issue;
      if (createdIssue) {
        createdIssues.push({
          id: createdIssue.id,
          identifier: createdIssue.identifier,
          title: issue.title,
        });
        console.log(`  ✓ ${createdIssue.identifier}: ${issue.title}`);
      }
    } catch (e: any) {
      console.log(`  ✗ Failed: ${issue.title} - ${e.message}`);
    }
  }

  // Step 4: Create project update
  console.log("\n📢 Creating project update...");
  try {
    await client.createProjectUpdate({
      projectId: project.id,
      body: `## Project Initialized 🚀

The Meeting Bingo MVP project has been set up with ${createdIssues.length} issues across 7 phases:

| Phase | Issues | Focus |
|-------|--------|-------|
| Foundation | 5 | Config, types, structure |
| Core Logic | 3 | Card generation, bingo detection, word matching |
| Components | 9 | React UI components |
| Speech | 3 | Web Speech API integration |
| Polish | 3 | Confetti, sharing, favicon |
| Testing | 2 | Build validation, manual testing |
| Deployment | 1 | Vercel deployment |

### Agent Assignment
- \`system-architect\`: Foundation setup
- \`coder\`: Core logic & components
- \`tester\`: Testing & validation
- \`cicd-engineer\`: Deployment

### Next Steps
1. Review and prioritize issues
2. Initialize claude-flow swarm
3. Begin Phase 1: Foundation

Issues are sized for <150k token execution by AI agents.`,
      health: "onTrack",
    });
    console.log("  ✓ Project update created");
  } catch (e: any) {
    console.log(`  ⚠ Project update: ${e.message}`);
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("✅ PROJECT CREATION COMPLETE");
  console.log("=".repeat(50));
  console.log(`Project: Meeting Bingo MVP`);
  console.log(`Issues: ${createdIssues.length}`);
  console.log(`Team: OSD`);
  console.log("\nIssue Summary:");
  createdIssues.forEach((i) => console.log(`  ${i.identifier}: ${i.title}`));
}

main().catch(console.error);
