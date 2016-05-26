import Immutable from 'immutable';


export const Events = {
  CHANGE: 'store:change',
  CHANGE_SELECTION: 'store:change-selection',
};

export default class Store {

  constructor(events) {
    this.events = events;
    this.reader = new FileReader();

    this.state = {
      sequence: new Immutable.List(),
      labels: new Immutable.List(),
      selection: new Immutable.OrderedSet(),
    };

    this.reader.onloadend = this.onFileLoadEnd.bind(this);
  }

  loadFromFile(file) {
    this.reader.readAsText(file);
  }

  addNewLabel(label) {
    this.state.labels.push(label);
    this.events.emit(Events.CHANGE, this.state);
  }

  onFileLoadEnd(event) {
    if (event.target.readyState === FileReader.DONE) {
      const parts = event.target.result.split('\n');
      const sequenceString = parts.slice(1).join('');

      this.state.sequence = new Immutable.List(sequenceString.split(''));
      this.events.emit(Events.CHANGE, this.state);
    }
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
}
