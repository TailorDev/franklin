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
const defaultLabels = new Immutable.List([
  {
    name: 'Exon',
    color: '#334854',
    isActive: true,
  },
  {
    name: 'Primer',
    color: '#f9c535',
    isActive: true,
  },
  {
    name: 'SNP',
    color: '#e04462',
    isActive: true,
  },
]);

export default class Store {

  constructor(events) {
    this.events = events;
    this.reader = new FileReader();

    this.state = {
      sequence: new Immutable.List(),
      labels: defaultLabels,
      selection: new Immutable.OrderedSet(),
      modalIsOpen: true,
    };

    // file reader
    this.offset = 0;
    this.file = null;
    this.fileParts = [];
    this.reader.onload = this.onFileLoad.bind(this);
  }

  getState() {
    return this.state;
  }

  loadFromFile(file) {
    this.events.emit(Events.LOADING_START);

    // reset
    this.offset = 0;
    this.file = file;
    this.fileParts = [];

    this.loadFileChunk();
  }

  loadFileChunk() {
    const end = this.offset + (10 * 1024); // chunk size
    const blob = this.file.slice(this.offset, end);
    this.offset = end;

    this.reader.readAsText(blob);
  }

  onFileLoad(event) {
    if (null === event.target.error) {
      let parts = event.target.result.split('\n');

      if (/>/.test(parts[0])) {
        parts = parts.slice(1);
      }

      this.fileParts = this.fileParts.concat(parts);
    }

    if (this.offset >= this.file.size) {
      this.state.sequence = new Immutable.List(
        this.fileParts.join('').split('')
      );

      this.events.emit(Events.LOADING_END);
      this.events.emit(Events.CHANGE, this.state);

      return;
    }

    this.loadFileChunk();
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

  startDemo() {
    this.state.sequence = defaultSequence;
    this.state.modalIsOpen = false;

    this.events.emit(Events.CHANGE, this.state);
  }

  closeModal() {
    this.state.modalIsOpen = false;

    this.events.emit(Events.CHANGE, this.state);
  }
}
