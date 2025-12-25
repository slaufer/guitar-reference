import { useState } from 'react';
import { midiToFrequency } from '../utils/musicTheory';
import { openStringMIDI } from '../utils/constants';

export const useAudioSynthesis = () => {
  const [playingNote, setPlayingNote] = useState(null);

  // Play a single note
  const playNote = (midi, stringIndex, fret) => {
    setPlayingNote(`${stringIndex}-${fret}`);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequency = midiToFrequency(midi);

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(frequency * 2, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
    gainNode2.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.3);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
    oscillator2.stop(audioContext.currentTime + 1.5);

    setTimeout(() => setPlayingNote(null), 300);
  };

  // Play entire chord
  const playChord = (position) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    position.frets.forEach((fret, stringIndex) => {
      if (fret === -1) return; // Skip muted strings

      const midi = openStringMIDI[stringIndex] + fret;
      const frequency = midiToFrequency(midi);

      // Slight delay between strings for strumming effect
      const startTime = now + (stringIndex * 0.03);

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(frequency * 2, startTime);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.08, startTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 2);

      gainNode2.gain.setValueAtTime(0, startTime);
      gainNode2.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
      gainNode2.gain.exponentialRampToValueAtTime(0.04, startTime + 0.5);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, startTime + 2);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);

      oscillator.start(startTime);
      oscillator2.start(startTime);
      oscillator.stop(startTime + 2);
      oscillator2.stop(startTime + 2);
    });
  };

  return { playingNote, playNote, playChord };
};
