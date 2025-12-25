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
    [5, 7]
  ],
  4: [
    [7, 10],
    [7, 10],
    [7, 9],
    [7, 9],
    [8, 10],
    [7, 10]
  ],
  5: [
    [10, 12],
    [10, 12],
    [9, 12],
    [9, 12],
    [10, 12],
    [10, 12]
  ]
};

export default pentatonicPatterns;
