/**
 * Displays the finger number indicator for chord fingerings
 * Shows a yellow circle with the finger number positioned to the right of the note
 */
const FingerIndicator = ({ fingerNumber }) => {
  if (fingerNumber <= 0) return null;

  return (
    <div
      className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-slate-900 z-10"
      style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}
    >
      {fingerNumber}
    </div>
  );
};

export default FingerIndicator;
