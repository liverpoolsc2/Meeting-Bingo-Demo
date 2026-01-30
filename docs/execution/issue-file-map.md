# Issue to File Mapping

Quick reference for which files each issue creates.

## Wave 1: Foundation

### OSD-66: Setup project configuration files
| File | Purpose |
|------|---------|
| `index.html` | HTML entry point |
| `tsconfig.json` | TypeScript config |
| `tsconfig.node.json` | Node TypeScript config |
| `vite.config.ts` | Vite bundler config |
| `tailwind.config.js` | Tailwind CSS config |
| `postcss.config.js` | PostCSS config |
| `src/vite-env.d.ts` | Vite type declarations |

### OSD-67: Create TypeScript type definitions
| File | Purpose |
|------|---------|
| `src/types/index.ts` | All TypeScript interfaces |

### OSD-68: Create project directory structure
| File | Purpose |
|------|---------|
| `src/main.tsx` | React entry point |
| `src/App.tsx` | Root component shell |
| `src/index.css` | Tailwind imports |
| `public/favicon.svg` | Browser favicon |

---

## Wave 2: Data

### OSD-69: Create category buzzword data
| File | Purpose |
|------|---------|
| `src/data/categories.ts` | Buzzword categories |

### OSD-70: Create utility functions
| File | Purpose |
|------|---------|
| `src/lib/utils.ts` | cn() and helpers |

---

## Wave 3: Core Logic

### OSD-71: Implement card generator logic
| File | Purpose |
|------|---------|
| `src/lib/cardGenerator.ts` | Card generation |

### OSD-73: Implement bingo checker logic
| File | Purpose |
|------|---------|
| `src/lib/bingoChecker.ts` | Win detection |

### OSD-74: Implement word detector logic
| File | Purpose |
|------|---------|
| `src/lib/wordDetector.ts` | Word matching |

---

## Wave 4: Base Components

### OSD-75: Create UI base components
| File | Purpose |
|------|---------|
| `src/components/ui/Button.tsx` | Button component |
| `src/components/ui/Card.tsx` | Card container |

### OSD-76: Create LandingPage component
| File | Purpose |
|------|---------|
| `src/components/LandingPage.tsx` | Welcome screen |

### OSD-78: Create BingoSquare component
| File | Purpose |
|------|---------|
| `src/components/BingoSquare.tsx` | Single square |

---

## Wave 5: Game Components

### OSD-77: Create CategorySelect component
| File | Purpose |
|------|---------|
| `src/components/CategorySelect.tsx` | Category picker |

### OSD-79: Create BingoCard component
| File | Purpose |
|------|---------|
| `src/components/BingoCard.tsx` | 5x5 grid |

### OSD-80: Create GameControls component
| File | Purpose |
|------|---------|
| `src/components/GameControls.tsx` | Control buttons |

### OSD-81: Create TranscriptPanel component
| File | Purpose |
|------|---------|
| `src/components/TranscriptPanel.tsx` | Live transcript |

---

## Wave 6: Hooks

### OSD-85: Implement useSpeechRecognition hook
| File | Purpose |
|------|---------|
| `src/hooks/useSpeechRecognition.ts` | Speech API wrapper |

### OSD-86: Implement useGame hook
| File | Purpose |
|------|---------|
| `src/hooks/useGame.ts` | Game state |

### OSD-87: Implement useLocalStorage hook
| File | Purpose |
|------|---------|
| `src/hooks/useLocalStorage.ts` | Persistence |

---

## Wave 7: Containers

### OSD-82: Create GameBoard container component
| File | Purpose |
|------|---------|
| `src/components/GameBoard.tsx` | Main game UI |

### OSD-83: Create WinScreen component
| File | Purpose |
|------|---------|
| `src/components/WinScreen.tsx` | Victory screen |

### OSD-84: Implement App component with screen routing
| File | Purpose |
|------|---------|
| `src/App.tsx` | Screen routing (update) |

---

## Wave 8: Polish

### OSD-88: Implement confetti celebration
| File | Purpose |
|------|---------|
| `src/lib/confetti.ts` | Confetti animation |

### OSD-89: Implement share functionality
| File | Purpose |
|------|---------|
| `src/lib/shareUtils.ts` | Share/clipboard |

### OSD-90: Add favicon and meta tags
| File | Purpose |
|------|---------|
| `public/favicon.svg` | Update favicon |
| `index.html` | Update meta tags |

---

## Wave 9: Testing

### OSD-91: Install dependencies and verify build
No files created - verification only.

### OSD-92: Manual testing checklist
No files created - testing only.

---

## Wave 10: Deployment

### OSD-93: Configure and deploy to Vercel
| File | Purpose |
|------|---------|
| `vercel.json` | Vercel config |

---

## Complete File Tree

```
meeting-bingo/
├── index.html                          # OSD-66, OSD-90
├── tsconfig.json                       # OSD-66
├── tsconfig.node.json                  # OSD-66
├── vite.config.ts                      # OSD-66
├── tailwind.config.js                  # OSD-66
├── postcss.config.js                   # OSD-66
├── vercel.json                         # OSD-93
├── public/
│   └── favicon.svg                     # OSD-68, OSD-90
└── src/
    ├── main.tsx                        # OSD-68
    ├── App.tsx                         # OSD-68, OSD-84
    ├── index.css                       # OSD-68
    ├── vite-env.d.ts                   # OSD-66
    ├── types/
    │   └── index.ts                    # OSD-67
    ├── data/
    │   └── categories.ts               # OSD-69
    ├── lib/
    │   ├── utils.ts                    # OSD-70
    │   ├── cardGenerator.ts            # OSD-71
    │   ├── bingoChecker.ts             # OSD-73
    │   ├── wordDetector.ts             # OSD-74
    │   ├── confetti.ts                 # OSD-88
    │   └── shareUtils.ts               # OSD-89
    ├── hooks/
    │   ├── useSpeechRecognition.ts     # OSD-85
    │   ├── useGame.ts                  # OSD-86
    │   └── useLocalStorage.ts          # OSD-87
    └── components/
        ├── LandingPage.tsx             # OSD-76
        ├── CategorySelect.tsx          # OSD-77
        ├── BingoSquare.tsx             # OSD-78
        ├── BingoCard.tsx               # OSD-79
        ├── GameControls.tsx            # OSD-80
        ├── TranscriptPanel.tsx         # OSD-81
        ├── GameBoard.tsx               # OSD-82
        ├── WinScreen.tsx               # OSD-83
        └── ui/
            ├── Button.tsx              # OSD-75
            └── Card.tsx                # OSD-75
```

**Total: 28 files**
