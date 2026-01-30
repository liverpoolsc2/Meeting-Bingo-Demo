# Meeting Bingo MVP - Execution Plan

## Overview

This document defines the execution waves for claude-flow specialist agents to implement the Meeting Bingo MVP. Issues are organized by dependencies and parallelization opportunities.

| Metric | Value |
|--------|-------|
| Total Issues | 27 |
| Total Waves | 10 |
| Estimated Tokens | ~780k |
| Swarm Topology | hierarchical |
| Max Concurrent Agents | 6 |

---

## Token Estimation Guide

| Size | Token Range | Description |
|------|-------------|-------------|
| S | 15-25k | Single file, straightforward logic |
| M | 30-45k | Multiple concerns, moderate complexity |
| L | 50-70k | Complex integration, multiple files |
| XL | 80-100k | Multi-system coordination |

---

## Wave Execution Summary

```
Wave 1 ──► Wave 2 ──► Wave 3 ──┬──► Wave 4 ──► Wave 5 ──┬──► Wave 7 ──► Wave 8 ──► Wave 9 ──► Wave 10
                               │                        │
                               └──────► Wave 6 ─────────┘
```

| Wave | Issues | Agents | Tokens | Parallel |
|------|--------|--------|--------|----------|
| 1 | 3 | system-architect | 75k | ✅ Yes |
| 2 | 2 | coder | 35k | ✅ Yes |
| 3 | 3 | coder | 115k | ✅ Yes |
| 4 | 3 | coder | 80k | ✅ Yes |
| 5 | 4 | coder | 115k | ✅ Yes |
| 6 | 3 | coder | 105k | ✅ Yes |
| 7 | 3 | coder | 120k | ⚠️ Sequential |
| 8 | 3 | coder | 50k | ✅ Yes |
| 9 | 2 | tester | 55k | ⚠️ Sequential |
| 10 | 1 | cicd-engineer | 25k | N/A |
| **Total** | **27** | | **~775k** | |

---

## Wave 1: Project Foundation

**Goal**: Establish project configuration and structure
**Agents**: 3x `system-architect`
**Dependencies**: None (starting wave)
**Parallelization**: Full parallel

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-66 | Setup project configuration files | 30k | system-architect-1 |
| OSD-67 | Create TypeScript type definitions | 20k | system-architect-2 |
| OSD-68 | Create project directory structure | 25k | system-architect-3 |

### Execution Command

```bash
# Initialize swarm
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 6

# Spawn Wave 1 agents (parallel)
Task({ prompt: "Execute OSD-66: Setup project configuration files", subagent_type: "system-architect", run_in_background: true })
Task({ prompt: "Execute OSD-67: Create TypeScript type definitions", subagent_type: "system-architect", run_in_background: true })
Task({ prompt: "Execute OSD-68: Create project directory structure", subagent_type: "system-architect", run_in_background: true })
```

### Success Criteria
- [ ] All config files created (tsconfig, vite, tailwind, postcss)
- [ ] TypeScript compiles without errors
- [ ] Directory structure matches architecture
- [ ] `npm run dev` starts without errors

---

## Wave 2: Foundation Data

**Goal**: Create category data and utility functions
**Agents**: 2x `coder`
**Dependencies**: Wave 1 (types must exist)
**Parallelization**: Full parallel

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-69 | Create category buzzword data | 20k | coder-1 |
| OSD-70 | Create utility functions | 15k | coder-2 |

### Execution Command

```bash
# Spawn Wave 2 agents (parallel)
Task({ prompt: "Execute OSD-69: Create category buzzword data with 45+ words per category", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-70: Create utility functions including cn() class merger", subagent_type: "coder", run_in_background: true })
```

### Success Criteria
- [ ] CATEGORIES array exported with 3 categories
- [ ] Each category has 45+ unique words
- [ ] cn() function merges Tailwind classes correctly
- [ ] TypeScript types match interfaces

---

## Wave 3: Core Game Logic

**Goal**: Implement card generation, bingo detection, and word matching
**Agents**: 3x `coder`
**Dependencies**: Wave 2 (categories and types)
**Parallelization**: Full parallel

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-71 | Implement card generator logic | 35k | coder-1 |
| OSD-73 | Implement bingo checker logic | 40k | coder-2 |
| OSD-74 | Implement word detector logic | 40k | coder-3 |

### Execution Command

```bash
# Spawn Wave 3 agents (parallel)
Task({ prompt: "Execute OSD-71: Implement card generator with Fisher-Yates shuffle", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-73: Implement bingo checker for rows, columns, diagonals", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-74: Implement word detector with aliases support", subagent_type: "coder", run_in_background: true })
```

### Success Criteria
- [ ] Card generator produces valid 5x5 grid
- [ ] Bingo checker detects all win conditions
- [ ] Word detector matches single words and phrases
- [ ] All functions have correct TypeScript types

---

## Wave 4: Base UI Components

**Goal**: Create foundational React components
**Agents**: 3x `coder`
**Dependencies**: Wave 1 (types, utils)
**Parallelization**: Full parallel

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-75 | Create UI base components | 25k | coder-1 |
| OSD-76 | Create LandingPage component | 25k | coder-2 |
| OSD-78 | Create BingoSquare component | 30k | coder-3 |

### Execution Command

```bash
# Spawn Wave 4 agents (parallel)
Task({ prompt: "Execute OSD-75: Create Button and Card UI components", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-76: Create LandingPage with hero and start button", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-78: Create BingoSquare with all visual states", subagent_type: "coder", run_in_background: true })
```

### Success Criteria
- [ ] Button component renders all variants
- [ ] LandingPage displays title and start button
- [ ] BingoSquare shows filled, unfilled, free, winning states
- [ ] Components use Tailwind CSS

---

## Wave 5: Game UI Components

**Goal**: Create remaining game-related components
**Agents**: 4x `coder`
**Dependencies**: Wave 4 (base components, BingoSquare)
**Parallelization**: Full parallel

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-77 | Create CategorySelect component | 30k | coder-1 |
| OSD-79 | Create BingoCard component | 25k | coder-2 |
| OSD-80 | Create GameControls component | 30k | coder-3 |
| OSD-81 | Create TranscriptPanel component | 25k | coder-4 |

### Execution Command

```bash
# Spawn Wave 5 agents (parallel)
Task({ prompt: "Execute OSD-77: Create CategorySelect with 3 category cards", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-79: Create BingoCard 5x5 grid container", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-80: Create GameControls with listen toggle", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-81: Create TranscriptPanel with detected words", subagent_type: "coder", run_in_background: true })
```

### Success Criteria
- [ ] CategorySelect shows 3 clickable category cards
- [ ] BingoCard renders 5x5 grid of BingoSquares
- [ ] GameControls toggles listening state
- [ ] TranscriptPanel displays live transcript

---

## Wave 6: React Hooks

**Goal**: Implement speech recognition and game state hooks
**Agents**: 3x `coder`
**Dependencies**: Wave 3 (core logic for useGame)
**Parallelization**: Full parallel
**Note**: Can run in parallel with Wave 5

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-85 | Implement useSpeechRecognition hook | 45k | coder-1 |
| OSD-86 | Implement useGame hook | 40k | coder-2 |
| OSD-87 | Implement useLocalStorage hook | 20k | coder-3 |

### Execution Command

```bash
# Spawn Wave 6 agents (parallel)
Task({ prompt: "Execute OSD-85: Implement useSpeechRecognition with Web Speech API", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-86: Implement useGame hook with state management", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-87: Implement useLocalStorage generic hook", subagent_type: "coder", run_in_background: true })
```

### Success Criteria
- [ ] useSpeechRecognition handles browser API
- [ ] useGame manages full game state
- [ ] useLocalStorage persists and retrieves data
- [ ] Hooks have proper TypeScript generics

---

## Wave 7: Container Components

**Goal**: Create main container components that integrate everything
**Agents**: 3x `coder`
**Dependencies**: Waves 5 + 6 (all components and hooks)
**Parallelization**: Sequential recommended (high integration)

### Issues

| Issue | Title | Tokens | Agent | Order |
|-------|-------|--------|-------|-------|
| OSD-82 | Create GameBoard container | 50k | coder-1 | 1st |
| OSD-83 | Create WinScreen component | 35k | coder-2 | 2nd |
| OSD-84 | Implement App component | 35k | coder-3 | 3rd |

### Execution Command

```bash
# Spawn Wave 7 agents (sequential for integration safety)
# Agent 1: GameBoard
Task({ prompt: "Execute OSD-82: Create GameBoard that integrates all game components and hooks", subagent_type: "coder" })

# After GameBoard complete:
# Agent 2: WinScreen
Task({ prompt: "Execute OSD-83: Create WinScreen with confetti trigger and stats", subagent_type: "coder" })

# After WinScreen complete:
# Agent 3: App routing
Task({ prompt: "Execute OSD-84: Implement App with screen routing logic", subagent_type: "coder" })
```

### Success Criteria
- [ ] GameBoard integrates speech + game state
- [ ] WinScreen displays victory with stats
- [ ] App routes between all screens
- [ ] Full game flow works end-to-end

---

## Wave 8: Polish Features

**Goal**: Add celebration effects, sharing, and branding
**Agents**: 3x `coder`
**Dependencies**: Wave 7 (WinScreen needs confetti)
**Parallelization**: Full parallel

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-88 | Implement confetti celebration | 15k | coder-1 |
| OSD-89 | Implement share functionality | 20k | coder-2 |
| OSD-90 | Add favicon and meta tags | 15k | coder-3 |

### Execution Command

```bash
# Spawn Wave 8 agents (parallel)
Task({ prompt: "Execute OSD-88: Implement confetti animation using canvas-confetti", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-89: Implement share with Web Share API fallback", subagent_type: "coder", run_in_background: true })
Task({ prompt: "Execute OSD-90: Add favicon SVG and meta tags", subagent_type: "coder", run_in_background: true })
```

### Success Criteria
- [ ] Confetti triggers on win
- [ ] Share works on mobile and desktop
- [ ] Favicon displays in browser tab
- [ ] Social preview tags work

---

## Wave 9: Testing & Validation

**Goal**: Verify build and execute manual testing
**Agents**: 1x `tester`
**Dependencies**: Wave 8 (all code complete)
**Parallelization**: Sequential (build must pass first)

### Issues

| Issue | Title | Tokens | Agent | Order |
|-------|-------|--------|-------|-------|
| OSD-91 | Install dependencies and verify build | 25k | tester | 1st |
| OSD-92 | Manual testing checklist | 30k | tester | 2nd |

### Execution Command

```bash
# Agent runs Docker build commands
Task({ prompt: "Execute OSD-91: Run npm install, typecheck, and build in Docker", subagent_type: "tester" })

# After build passes:
Task({ prompt: "Execute OSD-92: Complete manual testing checklist for all features", subagent_type: "tester" })
```

### Success Criteria
- [ ] `npm install` succeeds
- [ ] `npm run typecheck` passes
- [ ] `npm run build` produces dist/
- [ ] All manual test items pass

---

## Wave 10: Deployment

**Goal**: Deploy to Vercel production
**Agents**: 1x `cicd-engineer`
**Dependencies**: Wave 9 (tests must pass)
**Parallelization**: N/A (single task)

### Issues

| Issue | Title | Tokens | Agent |
|-------|-------|--------|-------|
| OSD-93 | Configure and deploy to Vercel | 25k | cicd-engineer |

### Execution Command

```bash
Task({ prompt: "Execute OSD-93: Create vercel.json and deploy to production", subagent_type: "cicd-engineer" })
```

### Success Criteria
- [ ] vercel.json created
- [ ] Deployment succeeds
- [ ] Production URL accessible
- [ ] All features work in production

---

## Execution Timeline

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           EXECUTION TIMELINE                                    │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  Wave 1 ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  75k tokens    │
│          │                                                                     │
│  Wave 2 ░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  35k tokens    │
│              │                                                                 │
│  Wave 3 ░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  115k tokens   │
│              │        │                                                        │
│  Wave 4 ░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  80k tokens    │
│                      │                                                         │
│  Wave 5 ░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  115k tokens   │
│                              │                                                 │
│  Wave 6 ░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  105k tokens   │
│                              │                                                 │
│  Wave 7 ░░░░░░░░░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░░░  120k tokens   │
│                                            │                                   │
│  Wave 8 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░  50k tokens    │
│                                                │                               │
│  Wave 9 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░  55k tokens    │
│                                                    │                           │
│  Wave 10░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░  25k tokens    │
│                                                                                │
│  TOTAL: ~775k tokens                                                           │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

## Parallel Execution Opportunities

### Maximum Parallelism Points

1. **Waves 3 + 4**: Core logic and base components can run simultaneously
2. **Waves 5 + 6**: Game components and hooks can run simultaneously
3. **Wave 8**: All polish tasks run in parallel

### Bottleneck Points

1. **Wave 7**: Integration components should run sequentially
2. **Wave 9**: Testing must wait for all code
3. **Wave 10**: Deployment depends on passing tests

---

## Claude-Flow Swarm Configuration

```bash
# Recommended swarm initialization
npx @claude-flow/cli@latest swarm init \
  --topology hierarchical \
  --max-agents 6 \
  --strategy specialized

# Memory namespaces for coordination
npx @claude-flow/cli@latest memory store \
  --namespace "meeting-bingo" \
  --key "current-wave" \
  --value "1"
```

---

## Issue Status Tracking

Update Linear issues as agents complete work:

```bash
# Mark issue in progress
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status "In Progress" OSD-66

# Mark issue done
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status Done OSD-66
```

---

## Rollback Plan

If any wave fails:

1. **Wave 1-2 Failure**: Reset and restart (minimal impact)
2. **Wave 3-6 Failure**: Fix specific component, re-run wave
3. **Wave 7 Failure**: Most likely integration issue - debug with `reviewer` agent
4. **Wave 9 Failure**: Build/test issues - spawn `tester` agent for diagnosis
5. **Wave 10 Failure**: Deployment config issue - check vercel.json and env vars

---

## Post-Execution

After Wave 10 completes:

1. Update Linear project status to "Completed"
2. Create project update with deployment URL
3. Store execution metrics in memory
4. Archive execution logs

```bash
# Final project update
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts project-status "Meeting Bingo MVP" completed
```
