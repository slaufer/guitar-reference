import React, { useState } from 'react';
import { Play } from 'lucide-react';
import ChordDiagram from './ChordDiagram';

const ChordThumbnail = ({ chord, onHover, onLeave, onSelect, onPlayChord, onOpenModal, isSelected }) => {
  const [selectedPosition, setSelectedPosition] = useState(0);

  const position = chord.positions[selectedPosition];

  const handlePositionClick = (index, e) => {
    e.stopPropagation();
    setSelectedPosition(index);
    onSelect({ chord, position: chord.positions[index], positionIndex: index });
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlayChord(position);
  };

  const handleThumbnailClick = () => {
    onSelect({ chord, position, positionIndex: selectedPosition });
  };

  return (
    <div
      className={`
        bg-slate-700/50 rounded-lg p-3 border-2 transition-all cursor-pointer
        flex-shrink-0 flex-grow-0
        ${isSelected ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-slate-600 hover:border-slate-500'}
      `}
      style={{ flexBasis: '140px' }}
      onMouseEnter={() => onHover({ chord, position, positionIndex: selectedPosition })}
      onMouseLeave={onLeave}
      onClick={handleThumbnailClick}
    >
      {/* Chord name */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-sm">{chord.name}</h3>
        <button
          onClick={handlePlayClick}
          className="p-1 rounded bg-green-600 hover:bg-green-500 transition-colors"
          title="Play chord"
        >
          <Play className="w-3 h-3 text-white" fill="white" />
        </button>
      </div>

      <div className="text-xs text-slate-400 mb-3">{chord.fullName}</div>

      {/* Mini fretboard diagram */}
      <div
        className="bg-slate-800 rounded p-1 mb-3 cursor-pointer hover:bg-slate-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal({ chord, position, positionIndex: selectedPosition });
        }}
        title="Click to enlarge"
      >
        <ChordDiagram position={position} />
      </div>

      {/* Position selector */}
      {chord.positions.length > 1 && (
        <div className="flex gap-1 justify-center">
          {chord.positions.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handlePositionClick(index, e)}
              className={`
                px-2 py-1 rounded text-xs font-semibold transition-colors
                ${selectedPosition === index
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChordThumbnail;
