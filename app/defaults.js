import Immutable from 'immutable';


export const emptyAnnotation = {
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
        positionTo: 125,
        comment: 'ENSE000036121231',
      },
      {
        positionFrom: 295,
        positionTo: 415,
        comment: 'ENSE000036121232',
      },
    ]),
  },
  {
    name: 'Primer',
    color: '#f9c535',
    isActive: true,
    annotations: new Immutable.List([
      {
        positionFrom: 20,
        positionTo: 10,
        comment: 'ENSE000036121231-FWD',
      },
      {
        positionFrom: 120,
        positionTo: 140,
        comment: 'ENSE000036121231-RV',
      },
      {
        positionFrom: 290,
        positionTo: 310,
        comment: 'ENSE000036121232-FWD',
      },
      {
        positionFrom: 400,
        positionTo: 420,
        comment: 'ENSE000036121232-RV',
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
          positionFrom: 104,
          positionTo: 104,
          comment: 'rs115543123',
        },
        {
          positionFrom: 201,
          positionTo: 202,
          comment: 'rs115543124',
        },
        {
          positionFrom: 340,
          positionTo: 340,
          comment: 'rs115543125',
        },
        {
          positionFrom: 355,
          positionTo: 355,
          comment: 'rs115543126',
        },
        {
          positionFrom: 374,
          positionTo: 375,
          comment: 'rs115543127',
        },
      ]
    ),
  },
]);
