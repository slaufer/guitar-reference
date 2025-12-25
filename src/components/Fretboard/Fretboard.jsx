import React from 'react';
import FretboardGrid from './FretboardGrid';
import FretboardString from './FretboardString';
import { useAudioSynthesis } from '../../hooks/useAudioSynthesis';
import { useFretboardHighlight } from '../../hooks/useFretboardHighlight';
import { openStringMIDI, stringLabels } from '../../utils/constants';
import pentatonicPatterns from '../../data/scales';

const Fretboard = ({ hoveredChord, selectedChord, selectedScale, scaleTranspose }) => {
  const { playingNote, playNote } = useAudioSynthesis();
  const isHighlighted = useFretboardHighlight(
    hoveredChord,
    selectedChord,
    selectedScale,
    scaleTranspose,
    pentatonicPatterns
  );

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
      <FretboardGrid />

      {/* Fretboard */}
      <div className="space-y-0">
        {openStringMIDI.map((openMIDI, stringIndex) => (
          <FretboardString
            key={stringIndex}
            stringIndex={stringIndex}
            stringLabel={stringLabels[5 - stringIndex]}
            playingNote={playingNote}
            isHighlighted={isHighlighted}
            onPlayNote={playNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Fretboard;
