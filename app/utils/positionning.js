/*
 * Positionning utils
 */

 /**
  * Calculate a nucleotide coordinates given its position in the sequence and
  * container (Visualizer) constraints.
  *
  * @param {number} index - nucleotide index in the sequence (0-based numbering)
  * @param {Object} visualizerParams - Visualizer properties
  *   - visualizerMargin
  *   - nucleotidesPerRow
  *   - nucleotideWidth
  *   - rowHeight
  * @return {Object} coordinates - nucleotide coordinates {x: 0, y: 0}
  */
export const getNucleotideCoordinates = (index, visualizerParams) => {
  const { visualizerMargin, nucleotidesPerRow, nucleotideWidth, rowHeight } = visualizerParams;

  const x = visualizerMargin.x + (nucleotideWidth * (index % nucleotidesPerRow));

  const currentRow = Math.trunc(index / nucleotidesPerRow);
  const y = visualizerMargin.y + (rowHeight * currentRow);

  return { x, y };
};

/**
 * Calculate annotation segment coordinates given its range in the sequence
 * and container (Visualizer) constraints.
 *
 * @param {number} indexFrom - from index in the sequence (0-based numbering)
 * @param {number} indexTo - to index in the sequence (0-based numbering)
 * @param {number} currentTrack - the current label track for this annotation (0-based numbering)
 * @param {Object} visualizerParams - Visualizer properties
 *   - visualizerMargin
 *   - nucleotidesPerRow
 *   - nucleotideWidth
 *   - rowHeight
 *   - nucleotidesRowHeight
 *   - trackHeight
 * @return {Object} coordinates - segment coordinates {x1: 0, x2: 0, y1: 0, y3: 0}
 */
export const getAnnotationSegmentCoordinates = (
  indexFrom, indexTo, currentTrack, visualizerParams
) => {
  const { nucleotideWidth, nucleotidesRowHeight, trackHeight } = visualizerParams;

  const nucleotideFromCoordinates = getNucleotideCoordinates(indexFrom, visualizerParams);
  const nucleotideToCoordinates = getNucleotideCoordinates(indexTo, visualizerParams);

  const x1 = (nucleotideWidth / 2) + nucleotideFromCoordinates.x;
  const x2 = nucleotideWidth + nucleotideToCoordinates.x;
  const y1 = nucleotidesRowHeight + nucleotideFromCoordinates.y + (trackHeight * currentTrack);
  const y2 = y1;

  return { x1, x2, y1, y2 };
};
