import { useMemo } from 'react';

export const useChordSearch = (chordDatabase, searchTerm) => {
  return useMemo(() => {
    if (!searchTerm) return chordDatabase;
    const term = searchTerm.toLowerCase();
    return chordDatabase.filter(chord =>
      chord.name.toLowerCase().includes(term) ||
      chord.fullName.toLowerCase().includes(term)
    );
  }, [chordDatabase, searchTerm]);
};
