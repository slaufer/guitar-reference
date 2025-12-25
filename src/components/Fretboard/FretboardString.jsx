import React from 'react';
import FretboardNote from './FretboardNote';
import { numFrets } from '../../utils/constants';
import { getMIDINote, midiToNoteName } from '../../utils/musicTheory';

const FretboardString = ({ stringIndex, stringLabel, playingNote, isHighlighted, onPlayNote }) => {
  return (
    <div className="flex items-center">
      {/* String label */}
      <div className="w-20 flex-shrink-0 pr-4 text-left">
        <span className="text-white font-semibold text-sm">
          {stringLabel}
        </span>
      </div>

      {/* Frets */}
      <div
        className={`flex-1 grid border-t-2 border-slate-600 relative ${stringIndex === 5 ? 'border-b-2' : ''}`}
        style={{ gridTemplateColumns: `repeat(${numFrets + 1}, 1fr)` }}
      >
        {Array.from({ length: numFrets + 1 }, (_, fret) => {
          const midi = getMIDINote(stringIndex, fret);
          const noteName = midiToNoteName(midi);
          const isPlaying = playingNote === `${stringIndex}-${fret}`;
          const highlight = isHighlighted(stringIndex, fret);

          return (
            <FretboardNote
              key={fret}
              stringIndex={stringIndex}
              fret={fret}
              noteName={noteName}
              isPlaying={isPlaying}
              highlight={highlight}
              onPlay={() => onPlayNote(midi, stringIndex, fret)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FretboardString;
