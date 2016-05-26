export default class Controller {

  constructor(components, events) {
    this.store = components.store;
    this.events = events;

    this.events.on('action:drop-file', this.onDropFile.bind(this));
    this.events.on('action:new-label', this.onNewLabel.bind(this));
    this.events.on('action:clear-selection', this.onClearSelection.bind(this));
    this.events.on('action:update-selection', this.onUpdateSelection.bind(this));
  }

  on(events, callback) {
    const names = events.split(/\s*,\s*/);

    names.forEach(event => this.events.on(event, callback));
  }

  dispatch(name, data) {
    this.events.emit(name, data);
  }

  onDropFile({ file }) {
    this.store.loadFromFile(file);
  }

  onNewLabel({ label }) {
    this.store.addNewLabel(label);
  }

  onClearSelection() {
    this.store.clearSelection();
  }

  onUpdateSelection({ selected }) {
    this.store.updateSelection(selected);
  }
}
