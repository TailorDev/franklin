import sinon from 'sinon';
import { expect } from 'chai';
import Fasta from '../fasta';

// see: https://github.com/mochajs/mocha/issues/1847
const { Promise, beforeEach, afterEach, describe, it } = global;


describe('utils/Fasta', () => {
  it('parses FASTA string', () => {
    const fasta = `
>sp|Q8VY26|CCD8_ARATH Carotenoid cleavage dioxygenase 8, chloroplastic OS=Arabidopsis thaliana GN=CCD8 PE=1 SV=1
MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN
SAAPSPLPEKEKVEGERRCHVAWTSVQQENWEGELTVQGKIPTWLNGTYLRNGPGLWNIG
DHDFRHLFDGYSTLVKLQFDGGRIFAAHRLLESDAYKAAKKHNRLCYREFSETPKSVIIN
KNPFSGIGEIVRLFSGESLTDNANTGVIKLGDGRVMCLTETQKGSILVDHETLETIGKFE
YDDVLSDHMIQSAHPIVTETEMWTLIPDLVKPGYRVVRMEAGSNKREVVGRVRCRSGSWG
PGWVHSFAVTENYVVIPEMPLRYSVKNLLRAEPTPLYKFEWCPQDGAFIHVMSKLTGEVV
ASVEVPAYVTFHFINAYEEDKNGDGKATVIIADCCEHNADTRILDMLRLDTLRSSHGHDV
LPDARIGRFRIPLDGSKYGKLETAVEAEKHGRAMDMCSINPLYLGQKYRYVYACGAQRPC
NFPNALSKVDIVEKKVKNWHEHGMIPSEPFFVPRPGATHEDDGVVISIVSEENGGSFAIL
LDGSSFEEIARAKFPYGLPYGLHGCWIPKD`;

    const result = Fasta.parseString(fasta);

    expect(result.header).to.be.defined;
    expect(result.sequence).to.be.defined;
    expect(result.header).to.equal('sp|Q8VY26|CCD8_ARATH Carotenoid cleavage dioxygenase 8, chloroplastic OS=Arabidopsis thaliana GN=CCD8 PE=1 SV=1');
    expect(result.sequence.size).to.equal(570);
  });

  it('parses FASTA string with a ";" for header', () => {
    const fasta = `
;sp|Q8VY26|CCD8_ARATH Carotenoid cleavage dioxygenase 8, chloroplastic OS=Arabidopsis thaliana GN=CCD8 PE=1 SV=1
MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN`;

    const result = Fasta.parseString(fasta);

    expect(result.header).to.be.defined;
    expect(result.sequence).to.be.defined;
    expect(result.header).to.equal('sp|Q8VY26|CCD8_ARATH Carotenoid cleavage dioxygenase 8, chloroplastic OS=Arabidopsis thaliana GN=CCD8 PE=1 SV=1');
    expect(result.sequence.size).to.equal(60);
  });

  it('parses FASTA string with a space after header sign', () => {
    const fasta = `
> foo bar baz
MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN`;

    const result = Fasta.parseString(fasta);

    expect(result.header).to.be.defined;
    expect(result.sequence).to.be.defined;
    expect(result.header).to.equal('foo bar baz');
    expect(result.sequence.size).to.equal(60);
  });

  it('parses FASTA string with a space after header sign', () => {
    const fasta = `
> foo bar baz
>   multiple
MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN`;

    const result = Fasta.parseString(fasta);

    expect(result.header).to.be.defined;
    expect(result.sequence).to.be.defined;
    expect(result.header).to.equal('foo bar baz\nmultiple');
    expect(result.sequence.size).to.equal(60);
  });

  it('parses an empty string', () => {
    const fasta = '';
    const result = Fasta.parseString(fasta);

    expect(result.header).to.be.defined;
    expect(result.sequence).to.be.defined;
    expect(result.header).to.equal('');
    expect(result.sequence.size).to.equal(0);
  });
});
