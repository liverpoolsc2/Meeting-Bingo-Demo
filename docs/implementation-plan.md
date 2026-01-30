# Meeting Bingo Implementation Plan

**For execution by claude-flow specialist agents**

## Overview

| Attribute | Value |
|-----------|-------|
| Stack | React 18 + TypeScript + Vite + Tailwind CSS |
| Build | Docker (local) → Vercel (production) |
| Container | `meeting-bingo-dev-1` |
| Port | 5173 |

---

## Phase 1: Foundation Setup

**Duration**: ~15 min
**Primary Agent**: `system-architect`
**Supporting**: `coder`

### Task 1.1: Project Configuration Files

Create/update configuration files:

```
Files to create:
├── index.html
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── src/
    └── vite-env.d.ts
```

### Task 1.2: Core Type Definitions

Create `src/types/index.ts` with:
- `CategoryId` type
- `Category` interface
- `BingoSquare` interface
- `BingoCard` interface
- `GameStatus` type
- `WinningLine` interface
- `GameState` interface
- `SpeechRecognitionState` interface
- `Toast` interface

### Task 1.3: Project Structure Setup

Create directory structure:
```
src/
├── main.tsx
├── App.tsx
├── index.css
├── components/
│   └── ui/
├── hooks/
├── lib/
├── data/
├── types/
└── context/
```

### Task 1.4: Category Data

Create `src/data/categories.ts` with:
- Agile & Scrum words (45 items)
- Corporate Speak words (45 items)
- Tech & Engineering words (45 items)

### Task 1.5: Utility Functions

Create `src/lib/utils.ts` with:
- `cn()` - className merger (clsx + tailwind-merge)

---

## Phase 2: Core Game Logic

**Duration**: ~20 min
**Primary Agent**: `coder`
**Supporting**: `tester`

### Task 2.1: Card Generator

Create `src/lib/cardGenerator.ts`:
- `shuffle<T>()` - Fisher-Yates algorithm
- `generateCard(categoryId)` - Creates 5x5 grid with 24 words + FREE center
- `getCardWords(card)` - Returns flat word list

### Task 2.2: Bingo Checker

Create `src/lib/bingoChecker.ts`:
- `checkForBingo(card)` - Returns WinningLine or null
- `countFilled(card)` - Returns filled square count
- `getClosestToWin(card)` - Returns hints for UI

### Task 2.3: Word Detector

Create `src/lib/wordDetector.ts`:
- `escapeRegex()` - Escape special chars
- `normalizeText()` - Lowercase and clean text
- `detectWords()` - Find card words in transcript
- `WORD_ALIASES` - Common variations mapping
- `detectWordsWithAliases()` - Enhanced detection

---

## Phase 3: React Components

**Duration**: ~25 min
**Primary Agent**: `coder`
**Supporting**: `reviewer`

### Task 3.1: Entry Point & App Shell

Create:
- `src/main.tsx` - React DOM render
- `src/App.tsx` - Screen routing (landing → category → game → win)
- `src/index.css` - Tailwind directives

### Task 3.2: UI Components

Create `src/components/ui/`:
- `Button.tsx` - Reusable button variants
- `Card.tsx` - Container card component

### Task 3.3: Landing Page

Create `src/components/LandingPage.tsx`:
- Hero section with title
- Start button
- Brief description

### Task 3.4: Category Selection

Create `src/components/CategorySelect.tsx`:
- Display 3 category cards (Agile, Corporate, Tech)
- Icon, name, description for each
- onClick handler to select category

### Task 3.5: Game Board Components

Create:
- `src/components/GameBoard.tsx` - Main game container
- `src/components/BingoCard.tsx` - 5x5 grid layout
- `src/components/BingoSquare.tsx` - Individual square with states
- `src/components/GameControls.tsx` - Start/stop listening, new card

### Task 3.6: Transcript Panel

Create `src/components/TranscriptPanel.tsx`:
- Listening indicator (pulsing dot)
- Live transcript display
- Detected words chips

### Task 3.7: Win Screen

Create `src/components/WinScreen.tsx`:
- Confetti animation trigger
- Winning line highlight
- Stats display (time, words detected)
- Play again / Home buttons
- Share functionality

---

## Phase 4: Speech Recognition

**Duration**: ~15 min
**Primary Agent**: `coder`
**Supporting**: `tester`

### Task 4.1: Speech Recognition Hook

Create `src/hooks/useSpeechRecognition.ts`:
- Initialize Web Speech API
- Handle `onresult` events
- Handle `onerror` events
- Auto-restart on `onend`
- Expose: `startListening`, `stopListening`, `resetTranscript`
- State: `isSupported`, `isListening`, `transcript`, `interimTranscript`, `error`

### Task 4.2: Game State Hook

Create `src/hooks/useGame.ts`:
- Manage GameState
- Handle square toggle (manual)
- Handle word detection (auto-fill)
- Check for bingo after each fill

### Task 4.3: LocalStorage Hook

Create `src/hooks/useLocalStorage.ts`:
- Generic get/set with JSON parsing
- Optional default value

---

## Phase 5: Integration & Polish

**Duration**: ~10 min
**Primary Agent**: `coder`
**Supporting**: `reviewer`, `tester`

### Task 5.1: Wire Speech to Game

In `GameBoard.tsx`:
- Connect useSpeechRecognition to useGame
- On transcript update → detectWords → fillSquares
- On BINGO → trigger win screen

### Task 5.2: Add Confetti

Create `src/lib/confetti.ts`:
- Import canvas-confetti
- `triggerConfetti()` - Burst animation on win

### Task 5.3: Share Functionality

Create `src/lib/shareUtils.ts`:
- `generateShareText()` - Create shareable message
- `shareResult()` - Use Web Share API or clipboard fallback

### Task 5.4: Favicon & Meta

Update:
- `public/favicon.svg` - Bingo card icon
- `index.html` - Meta tags, title

---

## Phase 6: Build & Test in Docker

**Duration**: ~10 min
**Primary Agent**: `tester`
**Supporting**: `reviewer`

### Task 6.1: Install Dependencies

```bash
docker exec meeting-bingo-dev-1 npm install
```

### Task 6.2: Type Check

```bash
docker exec meeting-bingo-dev-1 npm run typecheck
```

### Task 6.3: Build

```bash
docker exec meeting-bingo-dev-1 npm run build
```

### Task 6.4: Manual Test Checklist

- [ ] App loads at http://localhost:5173
- [ ] Landing page displays
- [ ] Category selection works
- [ ] Card generates with 24 unique words + FREE center
- [ ] Manual tap fills/unfills squares
- [ ] Speech recognition starts/stops
- [ ] Transcript displays
- [ ] Words auto-detect and fill
- [ ] BINGO triggers on 5-in-a-row
- [ ] Confetti plays
- [ ] Win screen shows stats
- [ ] Play again works

---

## Phase 7: Vercel Deployment

**Duration**: ~5 min
**Primary Agent**: `cicd-engineer`

### Task 7.1: Vercel Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Task 7.2: Deploy

```bash
# Install Vercel CLI (on host, not in Docker)
npm i -g vercel

# Deploy
vercel --prod
```

---

## Agent Assignment Summary

| Phase | Primary Agent | Tasks |
|-------|--------------|-------|
| 1 | `system-architect` | Config, types, structure |
| 2 | `coder` | Game logic (generator, checker, detector) |
| 3 | `coder` | React components |
| 4 | `coder` | Speech recognition hooks |
| 5 | `coder` | Integration, confetti, share |
| 6 | `tester` | Build validation, test checklist |
| 7 | `cicd-engineer` | Vercel deployment |

---

## Execution Command

```bash
# Initialize swarm with anti-drift config
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized

# Pre-task hook for routing
npx @claude-flow/cli@latest hooks pre-task --description "Build Meeting Bingo React app"
```

---

## File Manifest

### Config Files (7)
- `index.html`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `vercel.json`

### Source Files (24)
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/vite-env.d.ts`
- `src/types/index.ts`
- `src/data/categories.ts`
- `src/lib/utils.ts`
- `src/lib/cardGenerator.ts`
- `src/lib/bingoChecker.ts`
- `src/lib/wordDetector.ts`
- `src/lib/confetti.ts`
- `src/lib/shareUtils.ts`
- `src/hooks/useSpeechRecognition.ts`
- `src/hooks/useGame.ts`
- `src/hooks/useLocalStorage.ts`
- `src/components/LandingPage.tsx`
- `src/components/CategorySelect.tsx`
- `src/components/GameBoard.tsx`
- `src/components/BingoCard.tsx`
- `src/components/BingoSquare.tsx`
- `src/components/GameControls.tsx`
- `src/components/TranscriptPanel.tsx`
- `src/components/WinScreen.tsx`
- `src/components/ui/Button.tsx`

### Public Files (1)
- `public/favicon.svg`

**Total: 32 files**

---

## Dependencies

### Production
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `canvas-confetti` ^1.9.3
- `clsx` ^2.1.0
- `tailwind-merge` ^2.2.0

### Development
- `@types/canvas-confetti` ^1.6.4
- `@types/react` ^18.3.12
- `@types/react-dom` ^18.3.1
- `@vitejs/plugin-react` ^4.3.3
- `autoprefixer` ^10.4.20
- `postcss` ^8.4.47
- `tailwindcss` ^3.4.14
- `typescript` ~5.6.2
- `vite` ^5.4.10

---

## Success Criteria

1. **Builds without errors** in Docker
2. **Type-safe** - no TypeScript errors
3. **Functional** - all manual test items pass
4. **Deployed** - accessible on Vercel URL
5. **Responsive** - works on mobile and desktop
