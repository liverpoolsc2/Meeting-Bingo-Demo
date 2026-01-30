# Wave Quick Reference

## At a Glance

| Wave | Issues | Agent | Tokens | Parallel | Dependencies |
|------|--------|-------|--------|----------|--------------|
| 1 | OSD-66, 67, 68 | system-architect | 75k | ✅ | None |
| 2 | OSD-69, 70 | coder | 35k | ✅ | Wave 1 |
| 3 | OSD-71, 73, 74 | coder | 115k | ✅ | Wave 2 |
| 4 | OSD-75, 76, 78 | coder | 80k | ✅ | Wave 1 |
| 5 | OSD-77, 79, 80, 81 | coder | 115k | ✅ | Wave 4 |
| 6 | OSD-85, 86, 87 | coder | 105k | ✅ | Wave 3 |
| 7 | OSD-82, 83, 84 | coder | 120k | ⚠️ | Waves 5+6 |
| 8 | OSD-88, 89, 90 | coder | 50k | ✅ | Wave 7 |
| 9 | OSD-91, 92 | tester | 55k | ⚠️ | Wave 8 |
| 10 | OSD-93 | cicd-engineer | 25k | N/A | Wave 9 |

---

## Wave Commands

### Wave 1: Foundation
```bash
# 3 agents parallel
Task({ prompt: "OSD-66: Setup config files", subagent_type: "system-architect", run_in_background: true })
Task({ prompt: "OSD-67: Create types", subagent_type: "system-architect", run_in_background: true })
Task({ prompt: "OSD-68: Create directory structure", subagent_type: "system-architect", run_in_background: true })
```

### Wave 2: Data
```bash
# 2 agents parallel
Task({ prompt: "OSD-69: Create categories data", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-70: Create utils", subagent_type: "coder", run_in_background: true })
```

### Wave 3: Core Logic
```bash
# 3 agents parallel
Task({ prompt: "OSD-71: Card generator", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-73: Bingo checker", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-74: Word detector", subagent_type: "coder", run_in_background: true })
```

### Wave 4: Base Components
```bash
# 3 agents parallel
Task({ prompt: "OSD-75: UI components", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-76: LandingPage", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-78: BingoSquare", subagent_type: "coder", run_in_background: true })
```

### Wave 5: Game Components
```bash
# 4 agents parallel
Task({ prompt: "OSD-77: CategorySelect", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-79: BingoCard", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-80: GameControls", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-81: TranscriptPanel", subagent_type: "coder", run_in_background: true })
```

### Wave 6: Hooks
```bash
# 3 agents parallel
Task({ prompt: "OSD-85: useSpeechRecognition", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-86: useGame", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-87: useLocalStorage", subagent_type: "coder", run_in_background: true })
```

### Wave 7: Containers (Sequential)
```bash
# Sequential - wait for each
Task({ prompt: "OSD-82: GameBoard container", subagent_type: "coder" })
Task({ prompt: "OSD-83: WinScreen", subagent_type: "coder" })
Task({ prompt: "OSD-84: App routing", subagent_type: "coder" })
```

### Wave 8: Polish
```bash
# 3 agents parallel
Task({ prompt: "OSD-88: Confetti", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-89: Share utils", subagent_type: "coder", run_in_background: true })
Task({ prompt: "OSD-90: Favicon/meta", subagent_type: "coder", run_in_background: true })
```

### Wave 9: Testing (Sequential)
```bash
# Sequential
Task({ prompt: "OSD-91: Build verification in Docker", subagent_type: "tester" })
Task({ prompt: "OSD-92: Manual testing checklist", subagent_type: "tester" })
```

### Wave 10: Deploy
```bash
Task({ prompt: "OSD-93: Vercel deployment", subagent_type: "cicd-engineer" })
```

---

## Dependency Graph

```
Wave 1 (Foundation)
    │
    ├──► Wave 2 (Data) ──► Wave 3 (Logic) ──┐
    │                                        │
    └──► Wave 4 (Base UI) ──► Wave 5 (Game UI)──┼──► Wave 7 (Containers)
                                             │          │
                              Wave 6 (Hooks) ┘          │
                                                        ▼
                                               Wave 8 (Polish)
                                                        │
                                                        ▼
                                               Wave 9 (Test)
                                                        │
                                                        ▼
                                               Wave 10 (Deploy)
```

---

## Token Budget

| Category | Tokens |
|----------|--------|
| Foundation (Waves 1-2) | 110k |
| Core Logic (Wave 3) | 115k |
| Components (Waves 4-5) | 195k |
| Hooks (Wave 6) | 105k |
| Containers (Wave 7) | 120k |
| Polish (Wave 8) | 50k |
| Testing (Wave 9) | 55k |
| Deployment (Wave 10) | 25k |
| **Total** | **~775k** |

---

## Status Codes

Update issues in Linear:

```bash
# In Progress
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status "In Progress" OSD-XX

# Done
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status Done OSD-XX
```
