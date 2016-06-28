import Immutable from 'immutable';

export default class Fasta {
  static parseString(fasta) {
    const s = [];
    const h = [];

    fasta.split('\n').forEach((line) => {
      if ('>' === line[0] || ';' === line[0]) {
        h.push(line.replace(/^[>;]/, '').trim());
      } else {
        s.push(...line.split(''));
      }
    });

    return {
      header: h.join('\n'),
      sequence: new Immutable.List(s),
    };
  }
}
