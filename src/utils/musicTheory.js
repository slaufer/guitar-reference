import { openStringMIDI, noteNames } from './constants';

// Calculate current scale root note based on transposition
export const getScaleRootNote = (scaleTranspose) => {
  // E is at index 4 in the chromatic scale
  const eIndex = 4;
  const currentIndex = (eIndex + scaleTranspose + 12) % 12; // +12 to handle negative numbers
  return noteNames[currentIndex];
};

// Calculate relative major root note (3 semitones above minor)
export const getRelativeMajorNote = (scaleTranspose) => {
  // E is at index 4, relative major is G (index 7), which is 3 semitones up
  const eIndex = 4;
  const currentIndex = (eIndex + scaleTranspose + 3 + 12) % 12; // +3 for relative major, +12 to handle negative numbers
  return noteNames[currentIndex];
};

// Convert MIDI note to note name with octave
export const midiToNoteName = (midi) => {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${noteNames[noteIndex]}${octave}`;
};

// Convert MIDI to frequency
export const midiToFrequency = (midi) => {
  return 440 * Math.pow(2, (midi - 69) / 12);
};

// Get MIDI note for a string and fret
export const getMIDINote = (stringIndex, fret) => {
  return openStringMIDI[5 - stringIndex] + fret;
};
