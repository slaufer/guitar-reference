import React from 'react';
import ChordDiagram from './ChordDiagram';

const ChordModal = ({ modalChord, onClose }) => {
  if (!modalChord) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold text-2xl">{modalChord.chord.name}</h3>
            <p className="text-slate-400 text-sm">{modalChord.chord.fullName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="bg-slate-900 rounded p-4">
          <ChordDiagram position={modalChord.position} className="w-full" style={{ height: '300px' }} />
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChordModal;
