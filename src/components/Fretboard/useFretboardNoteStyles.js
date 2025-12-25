import { PENTATONIC_COLORS, generateGradient, generateShadow } from '../../utils/scaleColors';

/**
 * Custom hook to compute styling for fretboard notes based on their state
 *
 * @param {Object} highlight - Highlight information { highlighted, type, patterns, finger }
 * @param {boolean} isPlaying - Whether this note is currently playing
 * @returns {Object} { className, inlineStyle } - Computed styles for the note
 */
export const useFretboardNoteStyles = (highlight, isPlaying) => {
  const isChordNote = highlight.highlighted && highlight.type === 'chord';
  const isScaleNote = highlight.highlighted && highlight.type === 'scale';

  // Compute inline styles for scale patterns (solid color or gradient)
  const getInlineStyle = () => {
    if (!isScaleNote) return {};

    const patterns = highlight.patterns || [];
    if (patterns.length === 0) return {};

    if (patterns.length === 1) {
      // Single pattern: solid color
      return {
        backgroundColor: PENTATONIC_COLORS[patterns[0]].hex
      };
    } else {
      // Multiple patterns: gradient
      return {
        background: generateGradient(patterns),
        backgroundClip: 'padding-box'
      };
    }
  };

  // Compute CSS class names based on note state
  const getClassName = () => {
    const baseClasses = 'm-1 px-1 py-1.5 rounded-md text-xs font-mono font-semibold transition-all duration-200 w-full max-w-[44px] relative';

    if (isPlaying) {
      return `${baseClasses} bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/50`;
    }

    if (isChordNote) {
      return `${baseClasses} bg-emerald-500 text-white shadow-md shadow-emerald-500/30`;
    }

    if (isScaleNote) {
      const shadowClass = generateShadow(highlight.patterns || []);
      return `${baseClasses} text-white shadow-md ${shadowClass}`;
    }

    // Default/idle state
    return `${baseClasses} bg-slate-700 text-slate-200 hover:bg-slate-600 hover:scale-105 hover:shadow-md`;
  };

  return {
    className: getClassName(),
    inlineStyle: getInlineStyle()
  };
};
