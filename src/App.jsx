import React, { useState } from 'react';
import Fretboard from './components/Fretboard/Fretboard';
import ScaleSelector from './components/ScaleSelector/ScaleSelector';
import ChordLibrary from './components/ChordLibrary/ChordLibrary';
import ChordModal from './components/ChordLibrary/ChordModal';
import { useAudioSynthesis } from './hooks/useAudioSynthesis';
import { getScaleRootNote } from './utils/musicTheory';
import { noteNames } from './utils/constants';

const App = () => {
  const [hoveredChord, setHoveredChord] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);
  const [selectedScale, setSelectedScale] = useState([]);
  const [scaleTranspose, setScaleTranspose] = useState(0);
  const [modalChord, setModalChord] = useState(null);

  const { playChord } = useAudioSynthesis();

  const handleChordSelect = (chordData) => {
    setSelectedChord(chordData);
    setSelectedScale([]); // Clear scales when chord selected
  };

  const handleScaleSelect = (newScale) => {
    setSelectedScale(newScale);
    if (newScale.length > 0) {
      setSelectedChord(null); // Clear chord when scale selected
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Guitar Fretboard Reference</h1>
        </div>

        <Fretboard
          hoveredChord={hoveredChord}
          selectedChord={selectedChord}
          selectedScale={selectedScale}
          scaleTranspose={scaleTranspose}
        />

        <ScaleSelector
          selectedScale={selectedScale}
          scaleTranspose={scaleTranspose}
          onScaleSelect={handleScaleSelect}
          onScaleTranspose={setScaleTranspose}
          onScaleReset={() => setScaleTranspose(0)}
          scaleRootNote={getScaleRootNote(scaleTranspose)}
          onClearChord={() => setSelectedChord(null)}
        />

        <ChordLibrary
          onChordHover={setHoveredChord}
          onChordLeave={() => setHoveredChord(null)}
          onChordSelect={handleChordSelect}
          onChordPlay={playChord}
          onOpenModal={setModalChord}
          selectedChordName={selectedChord?.chord.name}
        />
      </div>

      <ChordModal modalChord={modalChord} onClose={() => setModalChord(null)} />
    </div>
  );
};

export default App;
