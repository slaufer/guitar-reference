import React from 'react';

const ChordDiagram = ({ position, className = "w-full h-24" }) => {
  return (
    <svg viewBox="0 -2 55 67" className={className}>
      {/* Strings (vertical lines) */}
      {[0, 1, 2, 3, 4, 5].map((string) => (
        <line
          key={`string-${string}`}
          x1={5 + string * 9}
          y1={5}
          x2={5 + string * 9}
          y2={60}
          stroke="#64748b"
          strokeWidth="0.5"
        />
      ))}

      {/* Frets (horizontal lines) */}
      {[0, 1, 2, 3, 4, 5].map((fret) => (
        <line
          key={`fret-${fret}`}
          x1={5}
          y1={5 + fret * 11}
          x2={50}
          y2={5 + fret * 11}
          stroke="#64748b"
          strokeWidth={fret === 0 ? "2" : "0.5"}
        />
      ))}

      {/* Finger positions */}
      {position.frets.map((fret, stringIndex) => {
        if (fret === -1) {
          // Muted string - X above nut
          return (
            <text
              key={`mute-${stringIndex}`}
              x={5 + stringIndex * 9}
              y={3}
              fontSize="4.5"
              fill="#ef4444"
              textAnchor="middle"
              fontWeight="bold"
            >
              ×
            </text>
          );
        } else if (fret === 0) {
          // Open string - O above nut
          return (
            <circle
              key={`open-${stringIndex}`}
              cx={5 + stringIndex * 9}
              cy={1.5}
              r={1.5}
              fill="none"
              stroke="#10b981"
              strokeWidth="0.8"
            />
          );
        } else {
          // Fretted note
          const displayFret = fret - position.baseFret;
          // For barre chords (baseFret > 0), shift down by 1 fret so the barre appears in fret 1
          const adjustedFret = position.baseFret > 0 ? displayFret + 1 : displayFret;
          return (
            <g key={`fret-${stringIndex}`}>
              <circle
                cx={5 + stringIndex * 9}
                cy={5 + adjustedFret * 11 - 5.5}
                r={3}
                fill="#fbbf24"
              />
              <text
                x={5 + stringIndex * 9}
                y={5 + adjustedFret * 11 - 4.5}
                fontSize="5"
                fill="#000"
                textAnchor="middle"
                fontWeight="bold"
              >
                {position.fingers[stringIndex]}
              </text>
            </g>
          );
        }
      })}

      {/* Base fret indicator if not at nut */}
      {position.baseFret > 0 && (
        <text
          x={1}
          y={11}
          fontSize="5"
          fill="#94a3b8"
          fontWeight="bold"
        >
          {position.baseFret}
        </text>
      )}
    </svg>
  );
};

export default ChordDiagram;
