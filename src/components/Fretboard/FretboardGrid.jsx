import React from 'react';
import { numFrets } from '../../utils/constants';

const FretboardGrid = () => {
  return (
    <div className="flex mb-2">
      <div className="w-20 flex-shrink-0 pr-4"></div>
      <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${numFrets + 1}, 1fr)` }}>
        {Array.from({ length: numFrets + 1 }, (_, i) => {
          const isMarkerFret = [3, 5, 7, 9, 15].includes(i);
          const isDoubleDot = i === 12;
          return (
            <div key={i} className="text-center relative flex items-center justify-center">
              {isMarkerFret && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 w-2 h-2 bg-slate-400 rounded-full opacity-50"></div>
              )}
              {isDoubleDot && (
                <>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 -ml-2 w-2 h-2 bg-slate-400 rounded-full opacity-50"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 ml-2 w-2 h-2 bg-slate-400 rounded-full opacity-50"></div>
                </>
              )}
              {i === 0 ? (
                <svg width="14" height="14" className="inline-block">
                  <circle
                    cx="7"
                    cy="7"
                    r="5"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <span className="text-slate-400 text-sm font-semibold">{i}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FretboardGrid;
