import React from 'react';
import { numFrets } from '../../utils/constants';

const FretboardNote = ({ stringIndex, fret, noteName, isPlaying, highlight, onPlay }) => {
  return (
    <div className="flex items-center justify-center relative">
      {/* Note button */}
      <button
        onClick={onPlay}
        className={`
          m-1 px-1 py-1.5 rounded-md text-xs font-mono font-semibold
          transition-all duration-200 w-full max-w-[44px] relative
          ${isPlaying
            ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/50'
            : highlight.highlighted && highlight.type === 'chord'
            ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
            : highlight.highlighted && highlight.type === 'scale'
            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
            : 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:scale-105 hover:shadow-md'
          }
        `}
      >
        {noteName}

        {/* Finger number indicator for chord notes */}
        {highlight.highlighted && highlight.type === 'chord' && highlight.finger > 0 && (
          <div
            className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-slate-900 z-10"
            style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}
          >
            {highlight.finger}
          </div>
        )}
      </button>

      {/* Fret line */}
      {fret < numFrets && (
        <div className="absolute right-0 top-0 h-full w-0.5 bg-slate-500"></div>
      )}
    </div>
  );
};

export default FretboardNote;
