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
    { frets: [-1, -1, 3, 2, 1, 1], fingers: [0, 0, 3, 2, 1, 1], baseFret: 0 },
    { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], baseFret: 1 },
    { frets: [8, 8, 10, 10, 10, 8], fingers: [1, 1, 3, 3, 3, 1], baseFret: 8 }
  ]},
  { name: 'Fm', fullName: 'F Minor', positions: [
    { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], baseFret: 1 },
    { frets: [8, 10, 10, 8, 8, 8], fingers: [1, 3, 4, 1, 1, 1], baseFret: 8 }
  ]},
  { name: 'F7', fullName: 'F Dominant 7', positions: [
    { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], baseFret: 0 },
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

export default chordDatabase;
