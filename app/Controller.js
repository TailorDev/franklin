export default class Controller {

  constructor(components, events) {
    this.store = components.store;
    this.events = events;

    this.events.on('action:drop-file', this.onDropFile.bind(this));
    this.events.on('action:new-label', this.onNewLabel.bind(this));
    this.events.on('action:edit-label', this.onEditLabel.bind(this));
    this.events.on('action:remove-label', this.onRemoveLabel.bind(this));
    this.events.on('action:toggle-label', this.onToggleLabel.bind(this));
    this.events.on('action:clear-selection', this.onClearSelection.bind(this));
    this.events.on('action:update-selection', this.onUpdateSelection.bind(this));
    this.events.on('action:start-demo', this.onStartDemo.bind(this));
    this.events.on('action:close-modal', this.onCloseModel.bind(this));
  }

  getState() {
    return this.store.getState();
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

  onEditLabel({ index, label }) {
    this.store.updateLabelAt(index, label);
  }

  onRemoveLabel({ index }) {
    this.store.removeLabelAt(index);
  }

  onToggleLabel({ index }) {
    this.store.toggleLabelAt(index);
  }

  onClearSelection() {
    this.store.clearSelection();
  }

  onUpdateSelection({ selected }) {
    this.store.updateSelection(selected);
  }

  onStartDemo() {
    this.store.startDemo();
  }

  onCloseModel() {
    this.store.closeModal();
  }
}
