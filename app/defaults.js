import Immutable from 'immutable';

export const defaultSequence = new Immutable.List(
  [
    'ATGGTCACTCTAATCGCAGTCTGCAATTTACGTGTTTCCAACTTAACGCCCCCAAGTTAATAGCCGTAAT',
    'CATTTGAAAAGAAAGGCACGCACGCACAACGCCATGCGGATCGAACCTGGGGACTCCTTTTGGACGAAAA',
    'AGGCGATGTTTTCCAACGCAGAAAGGCAGTACTTTGAGACGGTCCGTCCGCGGAAGACCAGTGTGAGTAA',
    'AAGTTGACCGTCGATGGCGATTTCACAAGTGACGTTTAAGTGGCGGGAACTTCTACTCACAAATCCCTGA',
    'GCCCTGTGATATGATTTATTTTATGGAGCCGTGATCCGGACGAAAAATGCACACACATTTCTACAAAAAT',
    'ATGTACATCGCGGTGCGATTGTGTCGCTTAAAGCACACGTACACCCACTGTCACACTCACACTCACATGC',
  ]
    .join('')
    .split('')
);

export const defaultLabels = new Immutable.List([
  {
    name: 'Primer',
    color: '#f9c535',
    isActive: true,
    annotations: new Immutable.List([
      {
        positionFrom: 20,
        positionTo: 10,
        comment: 'ENSE000036121231-FWD',
        displayTick: false,
      },
      {
        positionFrom: 120,
        positionTo: 140,
        comment: 'ENSE000036121231-RV',
        displayTick: true,
      },
      {
        positionFrom: 290,
        positionTo: 310,
        comment: 'ENSE000036121232-FWD',
        displayTick: true,
      },
      {
        positionFrom: 400,
        positionTo: 420,
        comment: 'ENSE000036121232-RV',
        displayTick: true,
      },
    ]),
  },
  {
    name: 'SNP',
    color: '#e04462',
    isActive: true,
    annotations: new Immutable.List([
      {
        positionFrom: 104,
        positionTo: 104,
        comment: 'rs115543123',
        displayTick: true,
      },
      {
        positionFrom: 201,
        positionTo: 202,
        comment: 'rs115543124',
        displayTick: true,
      },
      {
        positionFrom: 340,
        positionTo: 340,
        comment: 'rs115543125',
        displayTick: true,
      },
      {
        positionFrom: 355,
        positionTo: 355,
        comment: 'rs115543126',
        displayTick: true,
      },
      {
        positionFrom: 374,
        positionTo: 375,
        comment: 'rs115543127',
        displayTick: true,
      },
    ]),
  },
]);

export const defaultExons = new Immutable.List([
  {
    name: 'Exon 1',
    positionFrom: 150,
    positionTo: 159,
  },
]);
