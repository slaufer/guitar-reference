export const useFretboardHighlight = (hoveredChord, selectedChord, selectedScale, scaleTranspose, pentatonicPatterns) => {
  // Check if a fret is part of the active chord or scale
  const isHighlighted = (stringIndex, fret) => {
    // Check chord first
    const chord = hoveredChord || selectedChord;
    if (chord) {
      const chordFret = chord.position.frets[5 - stringIndex];
      // Only highlight chord notes if the string is not muted
      if (chordFret !== -1 && chordFret === fret) {
        return {
          highlighted: true,
          type: 'chord',
          finger: chord.position.fingers[5 - stringIndex]
        };
      }
    }

    // Check all selected scales with transposition
    if (selectedScale.length > 0) {
      for (const position of selectedScale) {
        const pattern = pentatonicPatterns[position];
        const stringFrets = pattern[5 - stringIndex];
        const transposedFrets = stringFrets.map(f => f + scaleTranspose);
        if (transposedFrets.includes(fret)) {
          return { highlighted: true, type: 'scale' };
        }
      }
    }

    return { highlighted: false };
  };

  return isHighlighted;
};
