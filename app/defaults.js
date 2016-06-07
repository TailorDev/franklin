import Immutable from 'immutable';


export const defaultSelection = { from: null, to: null };

export const defaultAnnotation = {
  positionFrom: undefined,
  positionTo: undefined,
  comment: '',
};

export const defaultSequence = new Immutable.List(
  [
    'ATGGTCACTCTAATCGCAGTCTGCAATTTACGTGTTTCCAACTTAACGCCCCCAAGTTAATAGCCGTAAT',
    'CATTTGAAAAGAAAGGCACGCACGCACAACGCCATGCGGATCGAACCTGGGGACTCCTTTTGGACGAAAA',
    'AGGCGATGTTTTCCAACGCAGAAAGGCAGTACTTTGAGACGGTCCGTCCGCGGAAGACCAGTGTGAGTAA',
    'AAGTTGACCGTCGATGGCGATTTCACAAGTGACGTTTAAGTGGCGGGAACTTCTACTCACAAATCCCTGA',
    'GCCCTGTGATATGATTTATTTTATGGAGCCGTGATCCGGACGAAAAATGCACACACATTTCTACAAAAAT',
    'ATGTACATCGCGGTGCGATTGTGTCGCTTAAAGCACACGTACACCCACTGTCACACTCACACTCACATGC',
  ].join('').split('')
);

export const defaultLabels = new Immutable.List([
  {
    name: 'Exon',
    color: '#334854',
    isActive: true,
    annotations: new Immutable.List([
      {
        positionFrom: 5,
        positionTo: 25,
        comment: 'Lorem Ipsum',
      },
      {
        positionFrom: 301,
        positionTo: 341,
        comment: 'Lorem Ipsum',
      },
    ]),
  },
  {
    name: 'Primer',
    color: '#f9c535',
    isActive: true,
    annotations: new Immutable.List([
      {
        positionFrom: 45,
        positionTo: 216,
        comment: 'Lorem Ipsum',
      },
      {
        positionFrom: 19,
        positionTo: 181,
        comment: 'Lorem Ipsum',
      },
    ]),
  },
  {
    name: 'SNP',
    color: '#e04462',
    isActive: true,
    annotations: new Immutable.List(
      [
        {
          positionFrom: 201,
          positionTo: 257,
          comment: 'Lorem Ipsum',
        },
      ]
    ),
  },
]);
