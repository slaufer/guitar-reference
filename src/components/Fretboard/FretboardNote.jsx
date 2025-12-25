import React from 'react';
import { useFretboardNoteStyles } from './useFretboardNoteStyles';
import FingerIndicator from './FingerIndicator';
import FretLine from './FretLine';

/**
 * Individual note button on the fretboard
 * Handles display and interaction for a single fret position
 *
 * @param {number} stringIndex - String number (0-5)
 * @param {number} fret - Fret number (0-15)
 * @param {string} noteName - Note name to display (e.g., "C", "F#")
 * @param {boolean} isPlaying - Whether this note is currently playing audio
 * @param {Object} highlight - Highlight state { highlighted, type, patterns, finger }
 * @param {Function} onPlay - Callback when note is clicked
 */
const FretboardNote = ({ stringIndex, fret, noteName, isPlaying, highlight, onPlay }) => {
  const { className, inlineStyle } = useFretboardNoteStyles(highlight, isPlaying);
  const isChordNote = highlight.highlighted && highlight.type === 'chord';

  return (
    <div className="flex items-center justify-center relative">
      <button onClick={onPlay} style={inlineStyle} className={className}>
        {noteName}
        {isChordNote && <FingerIndicator fingerNumber={highlight.finger} />}
      </button>
      <FretLine fret={fret} />
    </div>
  );
};

export default FretboardNote;
