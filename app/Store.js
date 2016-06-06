import Immutable from 'immutable';


export const Events = {
  CHANGE: 'store:change',
  CHANGE_SELECTION: 'store:change-selection',
  LOADING_START: 'store:loading-start',
  LOADING_END: 'store:loading-end',
};

const defaultSequence = new Immutable.List(
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
        indexFrom: 4,
        indexTo: 24,
        positionFrom: 5,
        positionTo: 25,
        comment: 'Lorem Ipsum',
      },
      {
        indexFrom: 300,
        indexTo: 340,
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
        indexFrom: 44,
        indexTo: 215,
        positionFrom: 45,
        positionTo: 216,
        comment: 'Lorem Ipsum',
      },
      {
        indexFrom: 18,
        indexTo: 180,
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
          indexFrom: 200,
          indexTo: 256,
          positionFrom: 201,
          positionTo: 257,
          comment: 'Lorem Ipsum',
        },
      ]
    ),
  },
]);


export default class Store {

  constructor(events, labels) {
    this.events = events;

    this.state = {
      sequence: new Immutable.List(),
      labels: labels || new Immutable.List(),
      selection: new Immutable.OrderedSet(),
    };

    // file reader
    this.file = {
      reader: new FileReader(),
      offset: 0,
      source: null,
      chunks: [],
    };
    this.file.reader.onload = this.onFileLoad.bind(this);
  }

  getState() {
    return this.state;
  }

  loadDataFromFile(file) {
    this.events.emit(Events.LOADING_START);

    this.file.offset = 0;
    this.file.source = file;
    this.file.chunks = [];

    this.readFileChunk();
  }

  readFileChunk() {
    const end = this.file.offset + (10 * 1024); // chunk size
    const blob = this.file.source.slice(this.file.offset, end);

    this.file.offset = end;
    this.file.reader.readAsText(blob);
  }

  onFileLoad(event) {
    if (null === event.target.error) {
      let chunks = event.target.result.split('\n');

      if (/>/.test(chunks[0])) {
        chunks = chunks.slice(1);
      }

      this.file.chunks = this.file.chunks.concat(chunks);
    }

    if (this.file.offset >= this.file.source.size) {
      this.state.sequence = new Immutable.List(
        this.file.chunks.join('').split('')
      );

      this.events.emit(Events.LOADING_END);
      this.events.emit(Events.CHANGE, this.state);

      return;
    }

    this.readFileChunk();
  }

  addNewLabel(label) {
    this.state.labels = this.state.labels.push(label);

    this.events.emit(Events.CHANGE, this.state);
  }

  updateLabelAt(index, label) {
    this.state.labels = this.state.labels.update(index, () => (
      {
        name: label.name,
        color: label.color,
        isActive: true,
        annotations: label.annotations,
      }
    ));

    this.events.emit(Events.CHANGE, this.state);
  }

  removeLabelAt(index) {
    this.state.labels = this.state.labels.splice(index, 1);

    this.events.emit(Events.CHANGE, this.state);
  }

  toggleLabelAt(index) {
    this.state.labels = this.state.labels.update(index, (label) => (
      {
        name: label.name,
        color: label.color,
        isActive: !label.isActive,
        annotations: label.annotations,
      }
    ));

    this.events.emit(Events.CHANGE, this.state);
  }

  clearSelection() {
    this.state.selection = this.state.selection.clear();
  }

  updateSelection(selected) {
    let previousSelection = this.state.selection;

    if (2 <= previousSelection.size) {
      previousSelection = previousSelection.slice(1);
    }

    this.state.selection = previousSelection.has(selected) ?
      previousSelection.delete(selected) : previousSelection.add(selected);

    this.events.emit(Events.CHANGE_SELECTION, this.state.selection);
  }

  loadDataFromDemo() {
    this.state.sequence = defaultSequence;
    this.state.labels = defaultLabels;

    this.events.emit(Events.CHANGE, this.state);
  }
}
