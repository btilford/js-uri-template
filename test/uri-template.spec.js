const chai = require('chai');
const UriTemplate = require('../lib/UriTemplate');
const { expect } = chai;


describe('UriTemplate spec', () => {
  describe('Basics', () => {
    it('The simplest expansion', () => {
      const val = UriTemplate.parse('https://xyz/{name}')
        .expand({
          name: 'abc'
        }).format();
      expect(val).to.equal('https://xyz/abc');
    });
    it('A bit more', () => {
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

  });

  describe('Chained Expansion', () => {
    const template = 'https://{.hostname}/path/{/id}';
    let uriTemplate = UriTemplate.parse(template);
    it('Allows leaving the template in tact after adding a hostname', () => {
      uriTemplate = uriTemplate.expand({ hostname: 'localhost' });

      const val = uriTemplate.format();
      expect(val).to.equal('https://localhost/path/{/id}');
    });
    it('And afterwards adding the rest of the params.', () => {
      const val = uriTemplate.expand({id: 123})
        .format();
      expect(val).to.equal('https://localhost/path/123');
    });
  });

  describe('Handling variable types', () => {
    it('Empty vars', () => {
      const val = UriTemplate.parse('http://some/thing{?abc}')
        .expand({ abc: '' })
        .format();
      expect(val).to.equal('http://some/thing?abc');
    });
    it('Undefined or null vars', () => {
      const val = UriTemplate.parse('http://some/thing{?abc}')
        .expand({ abc: null })
        .format();
      expect(val).to.equal('http://some/thing');
    });
  });
});