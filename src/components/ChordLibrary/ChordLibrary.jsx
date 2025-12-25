import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ChordThumbnail from './ChordThumbnail';
import { useChordSearch } from '../../hooks/useChordSearch';
import chordDatabase from '../../data/chords';

const ChordLibrary = ({ onChordHover, onChordLeave, onChordSelect, onChordPlay, onOpenModal, selectedChordName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredChords = useChordSearch(chordDatabase, searchTerm);

  return (
    <div className="mt-8 bg-slate-800/50 rounded-lg p-6 backdrop-blur">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Chord Library</h2>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search chords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-64"
          />
        </div>
      </div>

      {/* Chord thumbnails grid */}
      <div className="flex flex-wrap justify-between gap-4">
        {filteredChords.map((chord) => (
          <ChordThumbnail
            key={chord.name}
            chord={chord}
            onHover={onChordHover}
            onLeave={onChordLeave}
            onSelect={onChordSelect}
            onPlayChord={onChordPlay}
            onOpenModal={onOpenModal}
            isSelected={selectedChordName === chord.name}
          />
        ))}
      </div>

      {filteredChords.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          No chords found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default ChordLibrary;
