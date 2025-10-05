# New Features Documentation

## Features Implemented

### 1. Dark Mode Theme System

#### Files Created:
- `src/styles/theme.css` - CSS variables for light/dark themes
- `src/components/ThemeToggle.jsx` - Toggle component with localStorage persistence

#### Features:
- **Theme Toggle Button**: Located in the top-right header
  - ☀️ (sun) icon for dark mode - switches to light
  - 🌙 (moon) icon for light mode - switches to dark
- **Persistence**: Theme preference saved to localStorage
- **CSS Variables**: All colors now use CSS custom properties
  - Supports seamless theme switching across entire app
  - Variables include: backgrounds, text colors, card colors, buttons, overlays
- **Accessibility**: Proper ARIA labels for screen readers

#### Usage:
Click the theme toggle button in the top-right corner to switch between light and dark modes. Your preference is automatically saved.

---

### 2. Card Flip Animation Component

#### Files Created:
- `src/components/FlipCard.jsx` - Reusable 3D flip card component

#### Features:
- **3D Flip Animation**: Smooth 0.6s transition with preserve-3d
- **Controlled/Uncontrolled Modes**: 
  - Can be controlled externally via `isFlipped` prop
  - Or manages its own flip state internally
- **Keyboard Accessible**: Supports Enter/Space key activation
- **Customizable**: Accepts custom front/back content and CSS classes
- **Event Callback**: Optional `onFlip` callback for flip state changes

#### Props:
```javascript
FlipCard.propTypes = {
  front: PropTypes.node.isRequired,      // Front face content
  back: PropTypes.node.isRequired,       // Back face content
  isFlipped: PropTypes.bool,             // External flip control (optional)
  onFlip: PropTypes.func,                // Callback when flipped (optional)
  className: PropTypes.string,           // Additional CSS classes (optional)
}
```

#### Example Usage:
```jsx
<FlipCard
  front={<div>Card Front</div>}
  back={<div>Card Back</div>}
  isFlipped={isRevealed}
  onFlip={(flipped) => console.log('Flipped:', flipped)}
/>
```

---

### 3. Difficulty Selector

#### Files Created:
- `src/components/DifficultySelect.jsx` - Difficulty selection dropdown

#### Features:
- **Three Difficulty Levels**: Easy, Normal, Hard
- **localStorage Persistence**: Saves selected difficulty
- **Default**: Normal difficulty on first load
- **Enum Export**: `DifficultyLevel` constant for type safety
- **Callback Support**: Notifies parent component of changes

#### Integration:
- Located in top-right header next to theme toggle
- Difficulty prop passed to GameBoard component
- Can be used to adjust AI behavior (future implementation)

#### Props:
```javascript
DifficultySelect.propTypes = {
  onDifficultyChange: PropTypes.func,    // Callback with selected difficulty
  className: PropTypes.string,           // Additional CSS classes (optional)
}
```

---

## Code Quality Standards Met

✅ **PropTypes**: All new components have complete PropTypes definitions  
✅ **Performance**: Uses `useCallback`, `useMemo`, and `React.memo` appropriately  
✅ **Accessibility**: All buttons have `type="button"` and proper ARIA labels  
✅ **Documentation**: JSDoc comments for all functions and components  
✅ **Style Guide**: Follows AGENTS.md conventions (naming, file structure, etc.)  
✅ **Build Success**: Production build passes without errors  
✅ **No External Dependencies**: Pure React implementation  

---

## Files Modified

### `src/App.jsx`
- Added imports for ThemeToggle and DifficultySelect
- Added theme.css import
- Created app header with both components
- Added difficulty state management
- Passes difficulty prop to GameBoard

### `src/styles/App.css`
- Updated to use CSS variables throughout
- Added styles for:
  - `.app-header` - Fixed header container
  - `.theme-toggle` - Theme toggle button styles
  - `.difficulty-select` - Difficulty selector container
  - `.difficulty-dropdown` - Dropdown styling
  - `.flip-card*` - 3D flip card animation styles
- Converted hardcoded colors to CSS variables

---

## Testing

Build tested successfully:
```bash
npm run build
# ✓ Compiled successfully
# ✓ No TypeScript/ESLint errors
# ✓ File size: 50.39 kB (main.js) + 2.75 kB (main.css)
```

---

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS Features Used**:
  - CSS Custom Properties (variables)
  - CSS Grid/Flexbox
  - 3D Transforms (preserve-3d, backface-visibility)
  - CSS Transitions

---

## Future Enhancements

### Difficulty Implementation
The difficulty selector is ready but needs GameBoard integration:
- **Easy**: AI makes more random choices
- **Normal**: Current balanced AI behavior
- **Hard**: AI uses optimal strategy

### FlipCard Usage
The FlipCard component can be used for:
- Revealing AI cards with animation
- Deck preview feature
- Tutorial/help cards
- Special effect animations
