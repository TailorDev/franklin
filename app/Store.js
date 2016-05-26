import Immutable from 'immutable';


export const Events = {
  CHANGE: 'store:change',
};

export default class Store {

  constructor(events) {
    this.events = events;
    this.reader = new FileReader();

    this.state = {
      sequence: new Immutable.List(),
      labels: new Immutable.List(),
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
}
