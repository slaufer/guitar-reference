import React, { useState, useMemo } from 'react';
import { Search, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Chord Thumbnail Component
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
        <svg viewBox="0 -2 55 67" className="w-full h-24">
          {/* Strings (vertical lines) */}
          {[0, 1, 2, 3, 4, 5].map((string) => (
            <line
              key={`string-${string}`}
              x1={5 + string * 9}
              y1={5}
              x2={5 + string * 9}
              y2={60}
              stroke="#64748b"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Frets (horizontal lines) */}
          {[0, 1, 2, 3, 4, 5].map((fret) => (
            <line
              key={`fret-${fret}`}
              x1={5}
              y1={5 + fret * 11}
              x2={50}
              y2={5 + fret * 11}
              stroke="#64748b"
              strokeWidth={fret === 0 ? "2" : "0.5"}
            />
          ))}
          
          {/* Finger positions */}
          {position.frets.map((fret, stringIndex) => {
            if (fret === -1) {
              // Muted string - X above nut
              return (
                <text
                  key={`mute-${stringIndex}`}
                  x={5 + stringIndex * 9}
                  y={3}
                  fontSize="4.5"
                  fill="#ef4444"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  ×
                </text>
              );
            } else if (fret === 0) {
              // Open string - O above nut  
              return (
                <circle
                  key={`open-${stringIndex}`}
                  cx={5 + stringIndex * 9}
                  cy={1.5}
                  r={1.5}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.8"
                />
              );
            } else {
              // Fretted note
              const displayFret = fret - position.baseFret;
              // For barre chords (baseFret > 0), shift down by 1 fret so the barre appears in fret 1
              const adjustedFret = position.baseFret > 0 ? displayFret + 1 : displayFret;
              return (
                <g key={`fret-${stringIndex}`}>
                  <circle
                    cx={5 + stringIndex * 9}
                    cy={5 + adjustedFret * 11 - 5.5}
                    r={3}
                    fill="#fbbf24"
                  />
                  <text
                    x={5 + stringIndex * 9}
                    y={5 + adjustedFret * 11 - 4.5}
                    fontSize="5"
                    fill="#000"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {position.fingers[stringIndex]}
                  </text>
                </g>
              );
            }
          })}
          
          {/* Base fret indicator if not at nut */}
          {position.baseFret > 0 && (
            <text
              x={1}
              y={11}
              fontSize="5"
              fill="#94a3b8"
              fontWeight="bold"
            >
              {position.baseFret}
            </text>
          )}
        </svg>
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

const GuitarFretboard = () => {
  const [playingNote, setPlayingNote] = useState(null);
  const [hoveredChord, setHoveredChord] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);
  const [selectedScale, setSelectedScale] = useState([]); // Array of selected positions
  const [scaleTranspose, setScaleTranspose] = useState(0); // Semitones to shift scale
  const [searchTerm, setSearchTerm] = useState('');
  const [modalChord, setModalChord] = useState(null); // For enlarged chord modal

  // Standard tuning - MIDI note numbers for open strings (low to high)
  const openStringMIDI = [40, 45, 50, 55, 59, 64]; // E2, A2, D3, G3, B3, E4
  const stringNames = ['E', 'A', 'D', 'G', 'B', 'E'];
  const stringLabels = ['E (6th)', 'A (5th)', 'D (4th)', 'G (3rd)', 'B (2nd)', 'E (1st)'];

  // Chord database with multiple positions
  // Format: frets array [string 6 to 1], -1 = muted, 0 = open
  // fingers array: finger to use (0 = open/muted, 1-4 = fingers)
  const chordDatabase = [
    // A chords
    { name: 'A', fullName: 'A Major', positions: [
      { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 0 },
      { frets: [5, 7, 7, 6, 5, 5], fingers: [1, 3, 4, 2, 1, 1], baseFret: 5 },
      { frets: [12, 12, 14, 14, 14, 12], fingers: [1, 1, 3, 3, 3, 1], baseFret: 12 }
    ]},
    { name: 'Am', fullName: 'A Minor', positions: [
      { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 0 },
      { frets: [5, 7, 7, 5, 5, 5], fingers: [1, 3, 4, 1, 1, 1], baseFret: 5 },
      { frets: [12, 12, 14, 14, 13, 12], fingers: [1, 1, 3, 4, 2, 1], baseFret: 12 }
    ]},
    { name: 'A7', fullName: 'A Dominant 7', positions: [
      { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], baseFret: 0 },
      { frets: [5, 7, 5, 6, 5, 5], fingers: [1, 3, 1, 2, 1, 1], baseFret: 5 }
    ]},
    { name: 'Amaj7', fullName: 'A Major 7', positions: [
      { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0], baseFret: 0 }
    ]},
    { name: 'Am7', fullName: 'A Minor 7', positions: [
      { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], baseFret: 0 }
    ]},
    { name: 'Asus2', fullName: 'A Suspended 2', positions: [
      { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], baseFret: 0 }
    ]},
    { name: 'Asus4', fullName: 'A Suspended 4', positions: [
      { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 0 }
    ]},

    // B chords
    { name: 'B', fullName: 'B Major', positions: [
      { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 3, 3, 1], baseFret: 2 },
      { frets: [7, 9, 9, 8, 7, 7], fingers: [1, 3, 4, 2, 1, 1], baseFret: 7 }
    ]},
    { name: 'Bm', fullName: 'B Minor', positions: [
      { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 2 },
      { frets: [7, 9, 9, 7, 7, 7], fingers: [1, 3, 4, 1, 1, 1], baseFret: 7 }
    ]},
    { name: 'B7', fullName: 'B Dominant 7', positions: [
      { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 0 },
      { frets: [7, 9, 7, 8, 7, 7], fingers: [1, 3, 1, 2, 1, 1], baseFret: 7 }
    ]},
    
    // C chords
    { name: 'C', fullName: 'C Major', positions: [
      { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 0 },
      { frets: [3, 3, 5, 5, 5, 3], fingers: [1, 1, 3, 3, 3, 1], baseFret: 3 },
      { frets: [8, 10, 10, 9, 8, 8], fingers: [1, 3, 4, 2, 1, 1], baseFret: 8 }
    ]},
    { name: 'Cm', fullName: 'C Minor', positions: [
      { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], baseFret: 3 },
      { frets: [8, 10, 10, 8, 8, 8], fingers: [1, 3, 4, 1, 1, 1], baseFret: 8 }
    ]},
    { name: 'C7', fullName: 'C Dominant 7', positions: [
      { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], baseFret: 0 },
      { frets: [8, 10, 8, 9, 8, 8], fingers: [1, 3, 1, 2, 1, 1], baseFret: 8 }
    ]},
    { name: 'Cmaj7', fullName: 'C Major 7', positions: [
      { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], baseFret: 0 },
      { frets: [8, 10, 9, 9, 8, 8], fingers: [1, 4, 2, 3, 1, 1], baseFret: 8 }
    ]},
    
    // D chords
    { name: 'D', fullName: 'D Major', positions: [
      { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 0 },
      { frets: [5, 5, 7, 7, 7, 5], fingers: [1, 1, 3, 3, 3, 1], baseFret: 5 },
      { frets: [10, 12, 12, 11, 10, 10], fingers: [1, 3, 4, 2, 1, 1], baseFret: 10 }
    ]},
    { name: 'Dm', fullName: 'D Minor', positions: [
      { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 0 },
      { frets: [5, 6, 7, 7, 6, 5], fingers: [1, 2, 4, 3, 2, 1], baseFret: 5 },
      { frets: [10, 12, 12, 10, 10, 10], fingers: [1, 3, 4, 1, 1, 1], baseFret: 10 }
    ]},
    { name: 'D7', fullName: 'D Dominant 7', positions: [
      { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 0 },
      { frets: [10, 12, 10, 11, 10, 10], fingers: [1, 3, 1, 2, 1, 1], baseFret: 10 }
    ]},
    { name: 'Dmaj7', fullName: 'D Major 7', positions: [
      { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 1, 1], baseFret: 0 }
    ]},
    { name: 'Dm7', fullName: 'D Minor 7', positions: [
      { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], baseFret: 0 }
    ]},
    { name: 'Dsus2', fullName: 'D Suspended 2', positions: [
      { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0], baseFret: 0 }
    ]},
    { name: 'Dsus4', fullName: 'D Suspended 4', positions: [
      { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4], baseFret: 0 }
    ]},

    // E chords
    { name: 'E', fullName: 'E Major', positions: [
      { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], baseFret: 0 },
      { frets: [7, 7, 9, 9, 9, 7], fingers: [1, 1, 3, 3, 3, 1], baseFret: 7 },
      { frets: [12, 14, 14, 13, 12, 12], fingers: [1, 3, 4, 2, 1, 1], baseFret: 12 }
    ]},
    { name: 'Em', fullName: 'E Minor', positions: [
      { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 0 },
      { frets: [7, 7, 9, 9, 8, 7], fingers: [1, 1, 3, 4, 2, 1], baseFret: 7 },
      { frets: [12, 14, 14, 12, 12, 12], fingers: [1, 3, 4, 1, 1, 1], baseFret: 12 }
    ]},
    { name: 'E7', fullName: 'E Dominant 7', positions: [
      { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 0 },
      { frets: [12, 14, 12, 13, 12, 12], fingers: [1, 3, 1, 2, 1, 1], baseFret: 12 }
    ]},
    { name: 'Emaj7', fullName: 'E Major 7', positions: [
      { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0], baseFret: 0 }
    ]},
    { name: 'Em7', fullName: 'E Minor 7', positions: [
      { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0], baseFret: 0 }
    ]},
    { name: 'Esus4', fullName: 'E Suspended 4', positions: [
      { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0], baseFret: 0 }
    ]},

    // F chords
    { name: 'F', fullName: 'F Major', positions: [
      { frets: [-1, -1, 3, 2, 1, 1], fingers: [0, 0, 3, 2, 1, 1], baseFret: 0 }, // Open F
      { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], baseFret: 1 },
      { frets: [8, 8, 10, 10, 10, 8], fingers: [1, 1, 3, 3, 3, 1], baseFret: 8 }
    ]},
    { name: 'Fm', fullName: 'F Minor', positions: [
      { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], baseFret: 1 },
      { frets: [8, 10, 10, 8, 8, 8], fingers: [1, 3, 4, 1, 1, 1], baseFret: 8 }
    ]},
    { name: 'F7', fullName: 'F Dominant 7', positions: [
      { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], baseFret: 0 }, // Open F7
      { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1], baseFret: 1 },
      { frets: [8, 10, 8, 9, 8, 8], fingers: [1, 3, 1, 2, 1, 1], baseFret: 8 }
    ]},
    { name: 'Fmaj7', fullName: 'F Major 7', positions: [
      { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], baseFret: 0 },
      { frets: [1, 3, 2, 2, 1, 1], fingers: [1, 4, 2, 3, 1, 1], baseFret: 1 }
    ]},

    // G chords
    { name: 'G', fullName: 'G Major', positions: [
      { frets: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4], baseFret: 0 },
      { frets: [3, 5, 5, 4, 3, 3], fingers: [1, 3, 4, 2, 1, 1], baseFret: 3 },
      { frets: [10, 10, 12, 12, 12, 10], fingers: [1, 1, 3, 3, 3, 1], baseFret: 10 }
    ]},
    { name: 'Gm', fullName: 'G Minor', positions: [
      { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], baseFret: 3 },
      { frets: [10, 12, 12, 10, 10, 10], fingers: [1, 3, 4, 1, 1, 1], baseFret: 10 }
    ]},
    { name: 'G7', fullName: 'G Dominant 7', positions: [
      { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 0 },
      { frets: [3, 5, 3, 4, 3, 3], fingers: [1, 3, 1, 2, 1, 1], baseFret: 3 }
    ]},
    { name: 'Gmaj7', fullName: 'G Major 7', positions: [
      { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1], baseFret: 0 }
    ]},
    { name: 'Gsus4', fullName: 'G Suspended 4', positions: [
      { frets: [3, 3, 0, 0, 1, 3], fingers: [3, 4, 0, 0, 1, 2], baseFret: 0 }
    ]}
  ];

  // Filter chords based on search
  const filteredChords = useMemo(() => {
    if (!searchTerm) return chordDatabase;
    const term = searchTerm.toLowerCase();
    return chordDatabase.filter(chord => 
      chord.name.toLowerCase().includes(term) || 
      chord.fullName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Pentatonic scale patterns (E minor pentatonic)
  // Each pattern: array of 6 strings, each string has array of frets
  const pentatonicPatterns = {
    1: [
      [0, 3], // String 6 (low E)
      [0, 2], // String 5 (A)
      [0, 2], // String 4 (D)
      [0, 2], // String 3 (G)
      [0, 3], // String 2 (B)
      [0, 3]  // String 1 (high E)
    ],
    2: [
      [3, 5],
      [2, 5],
      [2, 5],
      [2, 4],
      [3, 5],
      [3, 5]
    ],
    3: [
      [5, 7],
      [5, 7],
      [5, 7],
      [4, 7],
      [5, 8],
      [5, 8]
    ],
    4: [
      [7, 10],
      [7, 10],
      [7, 9],
      [7, 9],
      [8, 10],
      [8, 10]
    ],
    5: [
      [10, 12],
      [10, 12],
      [9, 12],
      [9, 12],
      [10, 12],
      [10, 13]
    ]
  };
  
  const numFrets = 15;
  const noteNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

  // Calculate current scale root note based on transposition
  const getScaleRootNote = () => {
    // E is at index 4 in the chromatic scale
    const eIndex = 4;
    const currentIndex = (eIndex + scaleTranspose + 12) % 12; // +12 to handle negative numbers
    return noteNames[currentIndex];
  };

  // Convert MIDI note to note name with octave
  const midiToNoteName = (midi) => {
    const octave = Math.floor(midi / 12) - 1;
    const noteIndex = midi % 12;
    return `${noteNames[noteIndex]}${octave}`;
  };

  // Convert MIDI to frequency
  const midiToFrequency = (midi) => {
    return 440 * Math.pow(2, (midi - 69) / 12);
  };

  // Get MIDI note for a string and fret
  const getMIDINote = (stringIndex, fret) => {
    return openStringMIDI[5 - stringIndex] + fret;
  };

  // Check if a fret is part of the active chord or scale
  const isHighlighted = (stringIndex, fret) => {
    // Check chord first
    const chord = hoveredChord || selectedChord;
    if (chord) {
      const chordFret = chord.position.frets[5 - stringIndex];
      // Only highlight chord notes if the string is not muted
      if (chordFret !== -1 && chordFret === fret) {
        return { highlighted: true, type: 'chord' };
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Guitar Fretboard Reference</h1>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
          {/* Fret numbers */}
          <div className="flex mb-2">
            <div className="w-20 flex-shrink-0 pr-4"></div>
            <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${numFrets + 1}, 1fr)` }}>
              {Array.from({ length: numFrets + 1 }, (_, i) => {
                const isMarkerFret = [3, 5, 7, 9, 15].includes(i);
                const isDoubleDot = i === 12;
                return (
                  <div key={i} className="text-center relative flex items-center justify-center">
                    {isMarkerFret && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 w-2 h-2 bg-slate-400 rounded-full opacity-50"></div>
                    )}
                    {isDoubleDot && (
                      <>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 -ml-2 w-2 h-2 bg-slate-400 rounded-full opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 ml-2 w-2 h-2 bg-slate-400 rounded-full opacity-50"></div>
                      </>
                    )}
                    {i === 0 ? (
                      <svg width="14" height="14" className="inline-block">
                        <circle
                          cx="7"
                          cy="7"
                          r="5"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="1.5"
                        />
                      </svg>
                    ) : (
                      <span className="text-slate-400 text-sm font-semibold">{i}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fretboard */}
          <div className="space-y-0">
            {openStringMIDI.map((openMIDI, stringIndex) => (
              <div key={stringIndex} className="flex items-center">
                {/* String label */}
                <div className="w-20 flex-shrink-0 pr-4 text-left">
                  <span className="text-white font-semibold text-sm">
                    {stringLabels[5 - stringIndex]}
                  </span>
                </div>

                {/* Frets */}
                <div className={`flex-1 grid border-t-2 border-slate-600 relative ${stringIndex === 5 ? 'border-b-2' : ''}`} style={{ gridTemplateColumns: `repeat(${numFrets + 1}, 1fr)` }}>
                  {Array.from({ length: numFrets + 1 }, (_, fret) => {
                    const midi = openStringMIDI[5 - stringIndex] + fret;
                    const noteName = midiToNoteName(midi);
                    const isPlaying = playingNote === `${stringIndex}-${fret}`;
                    const highlight = isHighlighted(stringIndex, fret);

                    return (
                      <div
                        key={fret}
                        className="flex items-center justify-center relative"
                      >
                        {/* Note button */}
                        <button
                          onClick={() => playNote(midi, stringIndex, fret)}
                          className={`
                            m-1 px-1 py-1.5 rounded-md text-xs font-mono font-semibold
                            transition-all duration-200 w-full max-w-[44px]
                            ${isPlaying 
                              ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/50' 
                              : highlight.highlighted && highlight.type === 'chord'
                              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                              : highlight.highlighted && highlight.type === 'scale'
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                              : 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:scale-105 hover:shadow-md'
                            }
                          `}
                        >
                          {noteName}
                        </button>
                        
                        {/* Fret line */}
                        {fret < numFrets && (
                          <div className="absolute right-0 top-0 h-full w-0.5 bg-slate-500"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Pentatonic Scale Selector */}
        <div className="mt-6 bg-slate-800/50 rounded-lg p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{getScaleRootNote()} Minor Pentatonic Scale</h3>
            <div className="flex items-center gap-3">
              {/* Reset transpose button */}
              <button
                onClick={() => setScaleTranspose(0)}
                disabled={scaleTranspose === 0}
                className={`
                  px-2 py-1 rounded transition-all
                  ${scaleTranspose === 0 
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                  }
                `}
                title="Reset to original position"
              >
                ⟲
              </button>
              
              {/* Transpose down button */}
              <button
                onClick={() => setScaleTranspose(prev => Math.max(prev - 1, -12))}
                disabled={scaleTranspose <= -12}
                className={`
                  px-2 py-1 rounded transition-all
                  ${scaleTranspose <= -12 
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                  }
                `}
                title="Shift down one fret"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Position buttons */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((position) => (
                  <button
                    key={position}
                    onClick={() => {
                      if (selectedScale.includes(position)) {
                        // Remove from array
                        setSelectedScale(selectedScale.filter(p => p !== position));
                      } else {
                        // Add to array
                        setSelectedScale([...selectedScale, position]);
                        setSelectedChord(null); // Deselect chord when scale is selected
                      }
                    }}
                    className={`
                      px-3 py-1 rounded text-sm font-semibold transition-all
                      ${selectedScale.includes(position)
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }
                    `}
                  >
                    {['I', 'II', 'III', 'IV', 'V'][position - 1]}
                  </button>
                ))}
              </div>
              
              {/* Transpose up button */}
              <button
                onClick={() => setScaleTranspose(prev => Math.min(prev + 1, 12))}
                disabled={scaleTranspose >= 12}
                className={`
                  px-2 py-1 rounded transition-all
                  ${scaleTranspose >= 12 
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                  }
                `}
                title="Shift up one fret"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Chord Library Section */}
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
                onHover={(chordData) => setHoveredChord(chordData)}
                onLeave={() => setHoveredChord(null)}
                onSelect={(chordData) => {
                  setSelectedChord(chordData);
                  setSelectedScale([]); // Clear all selected scales when chord is selected
                }}
                onPlayChord={(position) => playChord(position)}
                onOpenModal={(chordData) => setModalChord(chordData)}
                isSelected={selectedChord?.chord.name === chord.name}
              />
            ))}
          </div>

          {filteredChords.length === 0 && (
            <div className="text-center text-slate-400 py-12">
              No chords found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
      
      {/* Chord Modal - rendered at root level for proper viewport coverage */}
      {modalChord && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
          onClick={() => setModalChord(null)}
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
                onClick={() => setModalChord(null)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="bg-slate-900 rounded p-4">
              <svg viewBox="0 -2 55 67" className="w-full" style={{ height: '300px' }}>
                {/* Strings (vertical lines) */}
                {[0, 1, 2, 3, 4, 5].map((string) => (
                  <line
                    key={`string-${string}`}
                    x1={5 + string * 9}
                    y1={5}
                    x2={5 + string * 9}
                    y2={60}
                    stroke="#64748b"
                    strokeWidth="0.5"
                  />
                ))}
                
                {/* Frets (horizontal lines) */}
                {[0, 1, 2, 3, 4, 5].map((fret) => (
                  <line
                    key={`fret-${fret}`}
                    x1={5}
                    y1={5 + fret * 11}
                    x2={50}
                    y2={5 + fret * 11}
                    stroke="#64748b"
                    strokeWidth={fret === 0 ? "2" : "0.5"}
                  />
                ))}
                
                {/* Finger positions */}
                {modalChord.position.frets.map((fret, stringIndex) => {
                  if (fret === -1) {
                    return (
                      <text
                        key={`mute-${stringIndex}`}
                        x={5 + stringIndex * 9}
                        y={3}
                        fontSize="4.5"
                        fill="#ef4444"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        ×
                      </text>
                    );
                  } else if (fret === 0) {
                    return (
                      <circle
                        key={`open-${stringIndex}`}
                        cx={5 + stringIndex * 9}
                        cy={1.5}
                        r={1.5}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="0.8"
                      />
                    );
                  } else {
                    const displayFret = fret - modalChord.position.baseFret;
                    const adjustedFret = modalChord.position.baseFret > 0 ? displayFret + 1 : displayFret;
                    return (
                      <g key={`fret-${stringIndex}`}>
                        <circle
                          cx={5 + stringIndex * 9}
                          cy={5 + adjustedFret * 11 - 5.5}
                          r={3}
                          fill="#fbbf24"
                        />
                        <text
                          x={5 + stringIndex * 9}
                          y={5 + adjustedFret * 11 - 4.5}
                          fontSize="5"
                          fill="#000"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {modalChord.position.fingers[stringIndex]}
                        </text>
                      </g>
                    );
                  }
                })}
                
                {/* Base fret indicator if not at nut */}
                {modalChord.position.baseFret > 0 && (
                  <text
                    x={1}
                    y={11}
                    fontSize="5"
                    fill="#94a3b8"
                    fontWeight="bold"
                  >
                    {modalChord.position.baseFret}
                  </text>
                )}
              </svg>
            </div>
            
            <button
              onClick={() => setModalChord(null)}
              className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuitarFretboard;
