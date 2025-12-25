import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScaleSelector = ({ selectedScale, scaleTranspose, onScaleSelect, onScaleTranspose, onScaleReset, scaleRootNote, onClearChord }) => {
  const handlePositionClick = (position) => {
    if (selectedScale.includes(position)) {
      // Remove from array
      onScaleSelect(selectedScale.filter(p => p !== position));
    } else {
      // Add to array
      onScaleSelect([...selectedScale, position]);
      onClearChord(); // Deselect chord when scale is selected
    }
  };

  return (
    <div className="mt-6 bg-slate-800/50 rounded-lg p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{scaleRootNote} Minor Pentatonic Scale</h3>
        <div className="flex items-center gap-3">
          {/* Reset transpose button */}
          <button
            onClick={onScaleReset}
            disabled={scaleTranspose === 0}
            className={`
              px-2 py-1 rounded transition-all
              ${scaleTranspose === 0
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600'
              }
            `}
            title="Reset to original position"
          >
            ⟲
          </button>

          {/* Transpose down button */}
          <button
            onClick={() => onScaleTranspose(Math.max(scaleTranspose - 1, -12))}
            disabled={scaleTranspose <= -12}
            className={`
              px-2 py-1 rounded transition-all
              ${scaleTranspose <= -12
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600'
              }
            `}
            title="Shift down one fret"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Position buttons */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((position) => (
              <button
                key={position}
                onClick={() => handlePositionClick(position)}
                className={`
                  px-3 py-1 rounded text-sm font-semibold transition-all
                  ${selectedScale.includes(position)
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }
                `}
              >
                {['I', 'II', 'III', 'IV', 'V'][position - 1]}
              </button>
            ))}
          </div>

          {/* Transpose up button */}
          <button
            onClick={() => onScaleTranspose(Math.min(scaleTranspose + 1, 12))}
            disabled={scaleTranspose >= 12}
            className={`
              px-2 py-1 rounded transition-all
              ${scaleTranspose >= 12
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600'
              }
            `}
            title="Shift up one fret"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScaleSelector;
