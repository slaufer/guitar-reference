import React from 'react';

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-2xl">How to Use Guitar Fretboard Reference</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="text-slate-300 space-y-4">
          <section>
            <h4 className="text-white font-semibold text-lg mb-2">Fretboard Visualization</h4>
            <p>
              The interactive fretboard displays all notes across the guitar neck.
              Click on any note to hear it played. The fretboard updates dynamically
              to show selected chords or scales.
            </p>
          </section>

          <section>
            <h4 className="text-white font-semibold text-lg mb-2">Pentatonic Scale Selector</h4>
            <p className="mb-2">
              Visualize the 5 positions of minor and major pentatonic scales on the fretboard:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Click position buttons (I-V) to highlight different scale patterns</li>
              <li>Select multiple positions simultaneously to see how they connect</li>
              <li>Use the arrow buttons to transpose the scale up or down the fretboard</li>
              <li>Click the reset button (⟲) to return to the original position</li>
              <li>Each position is color-coded for easy identification</li>
            </ul>
          </section>

          <section>
            <h4 className="text-white font-semibold text-lg mb-2">Chord Library</h4>
            <p className="mb-2">
              Browse and interact with a comprehensive collection of guitar chords:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Search for specific chords using the search bar</li>
              <li>Hover over a chord thumbnail to preview it on the fretboard</li>
              <li>Click a chord card to select and display it on the fretboard</li>
              <li>Click the play button (▶) to hear the chord</li>
              <li>Click the chord diagram thumbnail to expand</li>
            </ul>
          </section>

          <section>
            <h4 className="text-white font-semibold text-lg mb-2">Tips</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Selecting a chord will clear any active scale highlights</li>
              <li>Selecting a scale position will clear any active chord selection</li>
              <li>Combine multiple scale positions to visualize the entire pentatonic scale across the neck</li>
              <li>This page is a single HTML file -- save it and use it offline!</li>
            </ul>
          </section>


          <section>
            <h4 className="text-white font-semibold text-lg mb-2">About</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Created by <a href="https://endlessbeta.org/">Scott Laufer</a></li>
              <li>Source code on <a href="https://github.com/slaufer/guitar-reference/">GitHub</a></li>
              <li>Latest build <a href="https://slaufer.github.io/guitar-reference/">here</a></li>
            </ul>
          </section>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
