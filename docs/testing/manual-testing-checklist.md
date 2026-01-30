# Manual Testing Checklist

This document provides a comprehensive checklist for manually testing the Meeting Bingo application. Use this checklist before releases and after significant changes to ensure all functionality works as expected.

---

## 1. Landing Page

- [ ] Page loads without errors (no console errors)
- [ ] Title displays correctly ("Meeting Bingo" or similar)
- [ ] Description/tagline is visible and readable
- [ ] "Start Playing" button is visible and clickable
- [ ] Button navigates to category selection
- [ ] Page is responsive on mobile (320px width)
- [ ] Page is responsive on tablet (768px width)
- [ ] Page is responsive on desktop (1024px+ width)
- [ ] All fonts load correctly
- [ ] Images/icons load without broken links

---

## 2. Category Selection

- [ ] All 3 categories display on the page
- [ ] Category cards show name clearly
- [ ] Category cards show description
- [ ] Category cards show word count
- [ ] Clicking a category card navigates to the game
- [ ] Hover states work on category cards (desktop)
- [ ] Responsive grid layout on mobile (single column)
- [ ] Responsive grid layout on tablet (2 columns)
- [ ] Responsive grid layout on desktop (3 columns)
- [ ] Back/home navigation is available

---

## 3. Game Board

- [ ] 5x5 grid displays correctly (25 squares total)
- [ ] FREE space is in the center (position 13, row 3 col 3)
- [ ] FREE space is pre-filled/marked
- [ ] Manual click toggles square state (unmarked to marked)
- [ ] Manual click toggles square state (marked to unmarked)
- [ ] Words display readable in squares (not cut off)
- [ ] Long words wrap or truncate appropriately
- [ ] Grid is responsive on mobile
- [ ] Grid squares maintain aspect ratio
- [ ] Marked squares have clear visual distinction
- [ ] Grid does not overflow container

---

## 4. Speech Recognition

### Basic Functionality
- [ ] "Start Listening" button is visible
- [ ] Clicking "Start Listening" requests microphone permission
- [ ] Permission dialog appears (first time)
- [ ] Accepting permission starts listening
- [ ] Listening indicator shows when active (visual feedback)
- [ ] "Stop Listening" button appears when listening

### Transcript Panel
- [ ] Transcript panel is visible during listening
- [ ] Spoken words appear in transcript
- [ ] Transcript updates in real-time
- [ ] Transcript is scrollable if content overflows

### Word Detection
- [ ] Speaking a bingo word marks the corresponding square
- [ ] Detection works with variations (case insensitive)
- [ ] Multiple words can be detected in sequence
- [ ] Already marked squares remain marked
- [ ] Visual feedback when word is detected

### Controls
- [ ] "Stop Listening" stops recognition
- [ ] Listening indicator disappears when stopped
- [ ] Can restart listening after stopping
- [ ] No duplicate listeners created on restart

### Error Handling
- [ ] Denying microphone permission shows error message
- [ ] Error message is user-friendly
- [ ] App remains functional after permission denial
- [ ] Network/speech service errors handled gracefully

---

## 5. Win Condition

### Bingo Detection
- [ ] Row completion triggers win (test row 1)
- [ ] Row completion triggers win (test row 5)
- [ ] Column completion triggers win (test column 1)
- [ ] Column completion triggers win (test column 5)
- [ ] Diagonal completion triggers win (top-left to bottom-right)
- [ ] Diagonal completion triggers win (top-right to bottom-left)
- [ ] Win is detected immediately upon completion

### Win Screen
- [ ] Win screen/modal appears on bingo
- [ ] Win message is celebratory and clear
- [ ] Confetti animation plays
- [ ] Confetti does not cause performance issues
- [ ] Stats display correctly (time, squares marked, etc.)

### Post-Win Actions
- [ ] "Play Again" button is visible
- [ ] "Play Again" resets game with new card
- [ ] "Share" button is visible
- [ ] "Share" copies results to clipboard
- [ ] Clipboard copy shows confirmation message
- [ ] Shared text format is correct
- [ ] Can close win screen and view final board

---

## 6. Navigation

- [ ] Home/logo button returns to landing page
- [ ] "New Card" button generates fresh card
- [ ] New card has different word arrangement
- [ ] New card resets all marked squares (except FREE)
- [ ] Browser back button works correctly
- [ ] Browser forward button works correctly
- [ ] No console errors during navigation
- [ ] Page state is preserved appropriately
- [ ] URL updates reflect current view (if using routing)

---

## 7. Browser Compatibility

### Chrome (Primary - Full Support)
- [ ] All features work in Chrome desktop
- [ ] All features work in Chrome mobile (Android)
- [ ] Speech recognition works correctly
- [ ] No console errors or warnings

### Safari (WebKit Speech API)
- [ ] Page loads correctly
- [ ] Game board functions correctly
- [ ] Manual marking works
- [ ] Speech recognition works (or graceful fallback)
- [ ] No console errors

### Firefox (Limited Speech Support)
- [ ] Page loads correctly
- [ ] Game board functions correctly
- [ ] Manual marking works
- [ ] Speech recognition fallback message shown
- [ ] App is still usable without speech
- [ ] No console errors

### Edge
- [ ] All features work in Edge desktop
- [ ] Speech recognition works correctly
- [ ] No console errors

### Mobile Browsers
- [ ] Chrome mobile (Android) - full test
- [ ] Safari mobile (iOS) - full test
- [ ] Touch interactions work correctly
- [ ] Pinch/zoom does not break layout
- [ ] Orientation change handled (portrait/landscape)

---

## 8. Accessibility

- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Screen reader can announce game state
- [ ] Color contrast meets WCAG AA standards
- [ ] Text is resizable without breaking layout
- [ ] No content requires color alone to understand

---

## 9. Performance

- [ ] Initial page load under 3 seconds
- [ ] No layout shifts after load (CLS)
- [ ] Smooth animations (60fps)
- [ ] No memory leaks during extended play
- [ ] Speech recognition does not cause lag
- [ ] Confetti animation does not cause lag

---

## Testing Notes

**Tester Name:** ___________________

**Date:** ___________________

**Browser/Device:** ___________________

**Build/Version:** ___________________

### Issues Found

| Issue # | Description | Severity | Steps to Reproduce |
|---------|-------------|----------|-------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

### Additional Notes

```
[Add any additional observations, suggestions, or context here]
```

---

## Quick Smoke Test (5-minute version)

For rapid verification, complete these critical items:

1. [ ] Landing page loads
2. [ ] Can select a category
3. [ ] 5x5 board displays with FREE center
4. [ ] Can manually mark squares
5. [ ] Speech recognition starts (if supported)
6. [ ] Complete a row - win screen appears
7. [ ] "Play Again" works
8. [ ] No console errors throughout

---

## Sign-off

- [ ] All critical tests passed
- [ ] All major tests passed
- [ ] Known issues documented
- [ ] Ready for release

**Approved by:** ___________________

**Date:** ___________________
