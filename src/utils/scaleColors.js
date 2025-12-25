// Color configuration for pentatonic scale patterns
export const PENTATONIC_COLORS = {
  1: {
    bg: 'bg-red-500',
    shadow: 'shadow-red-500/30',
    hex: '#EF4444',
    name: 'red'
  },
  2: {
    bg: 'bg-amber-500',
    shadow: 'shadow-amber-500/30',
    hex: '#F59E0B',
    name: 'amber'
  },
  3: {
    bg: 'bg-violet-500',
    shadow: 'shadow-violet-500/30',
    hex: '#8B5CF6',
    name: 'violet'
  },
  4: {
    bg: 'bg-cyan-500',
    shadow: 'shadow-cyan-500/30',
    hex: '#06B6D4',
    name: 'cyan'
  },
  5: {
    bg: 'bg-pink-500',
    shadow: 'shadow-pink-500/30',
    hex: '#EC4899',
    name: 'pink'
  }
};

/**
 * Generate a horizontal gradient from left to right for multiple patterns with hard breakpoints
 * @param {number[]} patterns - Array of pattern numbers (1-5)
 * @returns {string|null} CSS linear-gradient string or single color hex
 */
export const generateGradient = (patterns) => {
  if (!patterns || patterns.length === 0) return null;
  if (patterns.length === 1) return PENTATONIC_COLORS[patterns[0]].hex;

  // Handle cyclic pattern order (V wraps back to I)
  // If we have both high patterns (4-5) and low patterns (1-2) with a gap, treat as cyclic
  const sorted = [...patterns].sort((a, b) => a - b);
  const hasLow = sorted.some(p => p <= 2);
  const hasHigh = sorted.some(p => p >= 4);
  const maxGap = Math.max(...sorted.slice(1).map((val, idx) => val - sorted[idx]));

  let orderedPatterns;
  // If spanning the cycle boundary (e.g., [1,5] or [1,4,5]), reorder to maintain flow
  if (hasLow && hasHigh && maxGap >= 2) {
    // Split into high and low groups, put high patterns first (V→I flow)
    const highPatterns = sorted.filter(p => p >= 4);
    const lowPatterns = sorted.filter(p => p <= 2);
    const midPatterns = sorted.filter(p => p === 3);
    orderedPatterns = [...highPatterns, ...lowPatterns, ...midPatterns];
  } else {
    orderedPatterns = sorted;
  }

  const colors = orderedPatterns.map(p => PENTATONIC_COLORS[p].hex).reverse();

  // Create equal-width color bands with hard edges
  const bandWidth = 100 / colors.length;
  const stops = colors.flatMap((color, idx) => {
    const start = idx * bandWidth;
    const end = (idx + 1) * bandWidth;
    return [`${color} ${start}%`, `${color} ${end}%`];
  }).join(', ');

  return `linear-gradient(to right, ${stops})`;
};

/**
 * Generate shadow class for pattern(s)
 * @param {number[]} patterns - Array of pattern numbers (1-5)
 * @returns {string} Tailwind shadow class
 */
export const generateShadow = (patterns) => {
  if (!patterns || patterns.length === 0) return '';

  // Use the first pattern's shadow color for simplicity
  // (multiple shadows could be averaged, but this is cleaner)
  return PENTATONIC_COLORS[patterns[0]].shadow;
};
