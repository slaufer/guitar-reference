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

    // Check all selected scales with transposition and repeating cycle
    if (selectedScale.length > 0) {
      const matchingPatterns = [];

      for (const position of selectedScale) {
        const pattern = pentatonicPatterns[position];
        const stringFrets = pattern[5 - stringIndex];

        // Check if current fret matches the pattern at any point in the repeating 12-fret cycle
        for (const patternFret of stringFrets) {
          // The pattern repeats every 12 frets (one octave)
          // Check if (fret - transpose - patternFret) is divisible by 12
          if ((fret - scaleTranspose - patternFret) % 12 === 0) {
            matchingPatterns.push(position);
            break; // No need to check other frets for this pattern
          }
        }
      }

      // Return all matching patterns
      if (matchingPatterns.length > 0) {
        return {
          highlighted: true,
          type: 'scale',
          patterns: matchingPatterns
        };
      }
    }

    return { highlighted: false };
  };

  return isHighlighted;
};
