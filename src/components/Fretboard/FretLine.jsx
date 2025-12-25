import { numFrets } from '../../utils/constants';

/**
 * Renders the vertical fret line separator
 * Only shown for frets before the last fret
 */
const FretLine = ({ fret }) => {
  if (fret >= numFrets) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-0.5 bg-slate-500"></div>
  );
};

export default FretLine;
