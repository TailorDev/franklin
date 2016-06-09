import Immutable from 'immutable';
import { defaultSequence, defaultLabels, emptySelection, emptyAnnotation } from './defaults';


export const Events = {
  CHANGE: 'store:change',
  CHANGE_SELECTION: 'store:change-selection',
  LOADING_START: 'store:loading-start',
  LOADING_END: 'store:loading-end',
  CHANGE_CURRENT_ANNOTATION: 'store:change-current-annotation',
};

export default class Store {

  constructor(events, labels) {
    this.events = events;

    this.state = {
      sequence: new Immutable.List(),
      positionFrom: 0,
      positionTo: 0,
      labels: labels || new Immutable.List(),
      selection: emptySelection,
      currentAnnotation: emptyAnnotation,
    };
  }

  getState() {
    return this.state;
  }

  loadDataFromFile(file) {
    this.events.emit(Events.LOADING_START);

    // file reader
    this.file = {
      reader: new FileReader(),
      offset: 0,
      chunks: [],
      source: file,
    };

    this.file.reader.onload = this.onFileLoad.bind(this);

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
      const sequence = new Immutable.List(this.file.chunks.join('').split(''));

      this.state = {
        sequence,
        // TODO: allow user input for from/to positions (at least from)
        positionFrom: 1,
        positionTo: sequence.size,
        labels: new Immutable.List(),
        selection: emptySelection,
        currentAnnotation: emptyAnnotation,
      };

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
    this.state.selection = emptySelection;

    this.events.emit(Events.CHANGE_SELECTION, this.state.selection);
  }

  /**
   * Here, `selected` is an index related to the sequence, starting from 0
   */
  updateSelection(selected) {
    if (selected === this.state.selection.from || selected === this.state.selection.to) {
      this.state.selection = emptySelection;
    } else if (
      (undefined === this.state.selection.from) ||
      (this.state.selection.from && this.state.selection.to)
    ) {
      this.state.selection = {
        from: selected,
        to: undefined,
      };
    } else if (undefined === this.state.selection.to) {
      this.state.selection = this.calculateSelection(selected, this.state.selection.from);
    }

    this.events.emit(Events.CHANGE_SELECTION, this.state.selection);
  }

  /**
   * Here, we pass a position in the sequence, which is NOT the index. By now,
   * the offset between is a position and its corresponding index is `-1`,
   * hence the code below.
   */
  updateSelectionFrom(positionFrom) {
    this.state.selection = {
      from: positionFrom - 1,
      to: this.state.selection.to,
    };

    this.events.emit(Events.CHANGE_SELECTION, this.state.selection);
  }

  /**
   * Here, we pass a position in the sequence, which is NOT the index. By now,
   * the offset between is a position and its corresponding index is `-1`,
   * hence the code below.
   */
  updateSelectionTo(positionTo) {
    this.state.selection = {
      from: this.state.selection.from,
      to: positionTo - 1,
    };

    this.events.emit(Events.CHANGE_SELECTION, this.state.selection);
  }

  calculateSelection(from, to) {
    if (from < to) {
      return {
        from,
        to,
      };
    }

    return {
      from: to,
      to: from,
    };
  }

  loadDataFromDemo() {
    this.state = {
      sequence: defaultSequence,
      positionFrom: 1,
      positionTo: defaultSequence.size,
      labels: defaultLabels,
      selection: emptySelection,
      currentAnnotation: emptyAnnotation,
    };

    this.events.emit(Events.CHANGE, this.state);
  }

  addAnnotation(labelId, annotation) {
    if (null === labelId || ! this.state.labels.has(labelId)) {
      return;
    }

    this.state.labels = this.state.labels.update(labelId, (v) => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.push(annotation),
      }
    ));

    this.events.emit(Events.CHANGE, this.state);
  }

  selectAnnotation(labelId, annotation) {
    if (! this.state.labels.has(labelId)) {
      return;
    }

    const annotationId = this.state.labels.get(labelId).annotations.findKey((v) => (
      v.positionFrom === annotation.positionFrom &&
        v.positionTo === annotation.positionTo
    ));

    if (undefined === annotationId) {
      return;
    }

    this.events.emit(Events.CHANGE_CURRENT_ANNOTATION, {
      labelId,
      annotation,
      annotationId,
    });
  }

  updateAnnotation(labelId, annotationId, annotation) {
    if (null === labelId || ! this.state.labels.has(labelId)) {
      return;
    }

    if (
      null === annotationId ||
      ! this.state.labels.get(labelId).annotations.has(annotationId)
    ) {
      return;
    }

    this.state.labels = this.state.labels.update(labelId, (v) => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.update(annotationId, () => annotation),
      }
    ));

    this.events.emit(Events.CHANGE, this.state);
  }
}
