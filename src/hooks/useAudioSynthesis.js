import { useState, useRef, useEffect } from 'react';
import { midiToFrequency } from '../utils/musicTheory';
import { openStringMIDI } from '../utils/constants';

// Audio envelope configuration for ADSR (Attack, Decay, Sustain, Release)
const AUDIO_CONFIG = {
  note: {
    attack: 0.01,        // Attack time in seconds
    decay: 0.3,          // Decay time in seconds
    sustain: 1.5,        // Total duration in seconds
    primaryGain: 0.3,    // Peak gain for triangle wave
    primaryDecay: 0.1,   // Sustain level for triangle wave
    harmonicGain: 0.15,  // Peak gain for harmonic (sine wave)
    harmonicDecay: 0.05, // Sustain level for harmonic
  },
  chord: {
    attack: 0.01,
    decay: 0.5,
    sustain: 2,
    primaryGain: 0.2,
    primaryDecay: 0.08,
    harmonicGain: 0.1,
    harmonicDecay: 0.04,
    strumDelay: 0.03,    // Delay between strings for strumming effect
  },
};

/**
 * Creates a guitar-like note using two oscillators:
 * - Primary: triangle wave at fundamental frequency
 * - Harmonic: sine wave at 2x frequency (adds brightness)
 *
 * @param {AudioContext} audioContext - The Web Audio context
 * @param {number} frequency - Frequency in Hz
 * @param {number} startTime - When to start the note (audioContext.currentTime + offset)
 * @param {Object} config - Envelope configuration (from AUDIO_CONFIG)
 */
const createGuitarNote = (audioContext, frequency, startTime, config) => {
  // Primary oscillator (triangle wave for warm guitar tone)
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, startTime);

  // ADSR envelope for primary oscillator
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(config.primaryGain, startTime + config.attack);
  gainNode.gain.exponentialRampToValueAtTime(config.primaryDecay, startTime + config.decay);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + config.sustain);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Harmonic oscillator (sine wave at 2x frequency adds brightness)
  const oscillator2 = audioContext.createOscillator();
  const gainNode2 = audioContext.createGain();

  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(frequency * 2, startTime);

  // ADSR envelope for harmonic oscillator (quieter than primary)
  gainNode2.gain.setValueAtTime(0, startTime);
  gainNode2.gain.linearRampToValueAtTime(config.harmonicGain, startTime + config.attack);
  gainNode2.gain.exponentialRampToValueAtTime(config.harmonicDecay, startTime + config.decay);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, startTime + config.sustain);

  oscillator2.connect(gainNode2);
  gainNode2.connect(audioContext.destination);

  // Start oscillators and schedule stop time
  oscillator.start(startTime);
  oscillator2.start(startTime);
  oscillator.stop(startTime + config.sustain);
  oscillator2.stop(startTime + config.sustain);
};

export const useAudioSynthesis = () => {
  const [playingNote, setPlayingNote] = useState(null);
  const audioContextRef = useRef(null);

  // Get or create AudioContext (reuses single instance to prevent memory leaks)
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume context if suspended by browser autoplay policy
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    return audioContextRef.current;
  };

  // Cleanup AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play a single note
  const playNote = (midi, stringIndex, fret) => {
    setPlayingNote(`${stringIndex}-${fret}`);

    const audioContext = getAudioContext();
    const frequency = midiToFrequency(midi);

    createGuitarNote(
      audioContext,
      frequency,
      audioContext.currentTime,
      AUDIO_CONFIG.note
    );

    setTimeout(() => setPlayingNote(null), 300);
  };

  // Play entire chord with strumming effect
  const playChord = (position) => {
    const audioContext = getAudioContext();
    const now = audioContext.currentTime;

    position.frets.forEach((fret, stringIndex) => {
      if (fret === -1) return; // Skip muted strings

      const midi = openStringMIDI[stringIndex] + fret;
      const frequency = midiToFrequency(midi);

      // Stagger string playback for realistic strum
      const startTime = now + (stringIndex * AUDIO_CONFIG.chord.strumDelay);

      createGuitarNote(
        audioContext,
        frequency,
        startTime,
        AUDIO_CONFIG.chord
      );
    });
  };

  return { playingNote, playNote, playChord };
};
