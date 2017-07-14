import {
  getNucleotideCoordinates,
  getAnnotationSegmentCoordinates,
  getAnnotationSegments,
} from '../positionning';
import sinon from 'sinon';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { Promise, beforeEach, afterEach, describe, it } = global;

describe('utils/positionning', () => {
  const NUCLEOTIDE_WIDTH = 5;
  const ROW_HEIGHT = 20;
  const NUCLEOTIDES_PER_ROW = 10;
  const NUCLEOTIDE_HEIGHT = 5;

  describe('getNucleotideCoordinates()', () => {
    it('returns an object { x, y }', () => {
      const { x, y } = getNucleotideCoordinates(
        0,
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT
      );

      expect(x).to.equal(0);
      expect(y).to.equal(0);
    });

    it('takes visualizer margins into account', () => {
      const { x, y } = getNucleotideCoordinates(
        0,
        { x: 6, y: 4 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT
      );

      expect(x).to.equal(6);
      expect(y).to.equal(4);
    });

    it('moves X only when nucleotide is part of the first line', () => {
      const { x, y } = getNucleotideCoordinates(
        1,
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT
      );

      expect(x).to.equal(NUCLEOTIDE_WIDTH);
      expect(y).to.equal(0);
    });

    it('moves X only when nucleotide is the last one on the first line', () => {
      const { x, y } = getNucleotideCoordinates(
        9,
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT
      );

      expect(x).to.equal(9 * NUCLEOTIDE_WIDTH);
      expect(y).to.equal(0);
    });

    it('moves Y only when nucleotide is the first one on the second line', () => {
      const { x, y } = getNucleotideCoordinates(
        NUCLEOTIDES_PER_ROW,
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT
      );

      expect(x).to.equal(0);
      expect(y).to.equal(ROW_HEIGHT);
    });

    it('moves X and Y only when nucleotide is the last one on the second line', () => {
      const { x, y } = getNucleotideCoordinates(
        NUCLEOTIDES_PER_ROW + 9,
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT
      );

      expect(x).to.equal(9 * NUCLEOTIDE_WIDTH);
      expect(y).to.equal(ROW_HEIGHT);
    });
  });

  describe('getAnnotationSegmentCoordinates()', () => {
    it('returns a tuple of coordinates', () => {
      const { x1, x2, y1, y2 } = getAnnotationSegmentCoordinates(
        0, //indexFrom
        1, //indexTo
        1, //currentTrack
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT,
        NUCLEOTIDE_HEIGHT,
        5 //trackHeight
      );

      expect(x1).to.equal(NUCLEOTIDE_WIDTH / 2);
      expect(y1).to.equal(NUCLEOTIDE_HEIGHT + 1 * 5);
      expect(x2).to.equal(NUCLEOTIDE_WIDTH + NUCLEOTIDE_WIDTH);
      expect(y2).to.equal(y1);
    });

    it('handles reverse selections', () => {
      const { x1, x2, y1, y2 } = getAnnotationSegmentCoordinates(
        1, //indexFrom
        0, //indexTo
        1, //currentTrack
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT,
        NUCLEOTIDE_HEIGHT,
        5 //trackHeight
      );

      expect(x1).to.equal(NUCLEOTIDE_WIDTH / 2);
      expect(y1).to.equal(NUCLEOTIDE_HEIGHT + 1 * 5);
      expect(x2).to.equal(NUCLEOTIDE_WIDTH + NUCLEOTIDE_WIDTH);
      expect(y2).to.equal(y1);
    });

    it('handles last nucleotide of a row', () => {
      const { x1, x2, y1, y2 } = getAnnotationSegmentCoordinates(
        NUCLEOTIDES_PER_ROW - 2, //indexFrom
        NUCLEOTIDES_PER_ROW - 1, //indexTo
        1, //currentTrack
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT,
        NUCLEOTIDE_HEIGHT,
        5 //trackHeight
      );

      expect(x1).to.equal(
        NUCLEOTIDE_WIDTH * (NUCLEOTIDES_PER_ROW - 2) + NUCLEOTIDE_WIDTH / 2
      );
      expect(y1).to.equal(NUCLEOTIDES_PER_ROW);
      expect(x2).to.equal(NUCLEOTIDES_PER_ROW * NUCLEOTIDE_WIDTH);
      expect(y2).to.equal(y1);
    });
  });

  describe('getAnnotationSegments()', () => {
    it('handles the last nucleotide of a first row', () => {
      const segments = getAnnotationSegments(
        NUCLEOTIDES_PER_ROW - 1,
        NUCLEOTIDES_PER_ROW,
        2,
        { x: 0, y: 0 },
        NUCLEOTIDES_PER_ROW,
        NUCLEOTIDE_WIDTH,
        ROW_HEIGHT,
        NUCLEOTIDE_HEIGHT,
        5 //trackHeight
      );

      expect(segments).to.have.length(2);
      expect(segments[0]).to.deep.equal({ x1: 47.5, x2: 50, y1: 15, y2: 15 });
      expect(segments[1]).to.deep.equal({ x1: 2.5, x2: 5, y1: 35, y2: 35 });
    });
  });
});
