/*
 * Positionning utils
 */

 /**
  * Calculate a nucleotide coordinates given its position in the sequence and
  * container (Visualizer) constraints.
  *
  * @param {number} index - nucleotide index in the sequence (0-based numbering)
  * @param {number} visualizerMargin
  * @param {number} nucleotidesPerRow
  * @param {number} nucleotideWidth
  * @param {number} rowHeight
  * @return {Object} coordinates - nucleotide coordinates {x: 0, y: 0}
  */
export const getNucleotideCoordinates = (
  index, visualizerMargin, nucleotidesPerRow, nucleotideWidth, rowHeight
) => {
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
 * @param {number} visualizerMargin
 * @param {number} nucleotidesPerRow
 * @param {number} nucleotideWidth
 * @param {number} rowHeight
 * @param {number} nucleotidesRowHeight
 * @param {number} trackHeight
 * @return {Object} coordinates - segment coordinates {x1: 0, x2: 0, y1: 0, y2: 0}
 */
export const getAnnotationSegmentCoordinates = (
  indexFrom, indexTo, currentTrack, visualizerMargin, nucleotidesPerRow,
  nucleotideWidth, rowHeight, nucleotidesRowHeight, trackHeight
) => {
  const { from, to } = indexFrom < indexTo ?
    { from: indexFrom, to: indexTo } : { from: indexTo, to: indexFrom };

  const nucleotideFromCoordinates = getNucleotideCoordinates(
    from,
    visualizerMargin,
    nucleotidesPerRow,
    nucleotideWidth,
    rowHeight
  );
  const nucleotideToCoordinates = getNucleotideCoordinates(
    to,
    visualizerMargin,
    nucleotidesPerRow,
    nucleotideWidth,
    rowHeight
  );

  const x1 = (nucleotideWidth / 2) + nucleotideFromCoordinates.x;
  const x2 = nucleotideWidth + nucleotideToCoordinates.x;
  const y1 = nucleotidesRowHeight + nucleotideFromCoordinates.y + (trackHeight * currentTrack);
  const y2 = y1;

  return { x1, x2, y1, y2 };
};

/**
 */
export const getAnnotationSegments = (
  indexFrom, indexTo, currentTrack, visualizerMargin, nucleotidesPerRow,
  nucleotideWidth, rowHeight, nucleotidesRowHeight, trackHeight
) => {
  const segments = [];
  const { from, to } = indexFrom < indexTo ?
    { from: indexFrom, to: indexTo } : { from: indexTo, to: indexFrom };

  let start = from;
  for (let i = start + 1; i <= to; i++) {
    if (! (i % nucleotidesPerRow)) {
      segments.push([start, i - 1]);
      start = i;
    }
  }
  segments.push([start, to]);

  return segments.map((segment) =>
    getAnnotationSegmentCoordinates(
      segment[0],
      segment[1],
      currentTrack,
      visualizerMargin,
      nucleotidesPerRow,
      nucleotideWidth,
      rowHeight,
      nucleotidesRowHeight,
      trackHeight
    )
  );
};
