const chai = require('chai');
const UriTemplate = require('../lib/UriTemplate');
const { expect } = chai;


describe('UriTemplate spec', () => {
  describe('basics', () => {
    it('simplest thing', () => {
      const val = UriTemplate.parse('https://xyz/{name}')
        .expand({
          name: 'abc'
        }).format();
      expect(val).to.equal('https://xyz/abc');
    });
    it('a bit more', () => {
      const val = UriTemplate.parse('https://{.host*}{/version,path*}{?a,b,c*}{#some-id}')
        .expand({
          host: ['acme', 'com'],
          path: ['some', 'thing'],
          version: 'v2',
          a: 'A',
          b: 'B',
          c: 'the letter c',
          'some-id': 'thing 1'
        }).format();
      expect(val).to.equal('https://acme.com/v2/some/thing?a=A?b=B?c=the%20letter%20c#thing%201');
    });
    it('handles empty vars', () => {
      const val = UriTemplate.parse('http://some/thing{?abc}')
        .expand({abc:''})
        .format();
      expect(val).to.equal('http://some/thing?abc');
    });
    it('handles null vars', () => {
      const val = UriTemplate.parse('http://some/thing{?abc}')
        .expand({abc:null})
        .format();
      expect(val).to.equal('http://some/thing');
    });
  });
});