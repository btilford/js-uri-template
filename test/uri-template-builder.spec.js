const chai = require('chai');
const UriTemplateBuilder = require('../lib/UriTemplateBuilder');
const { expect } = chai;


describe('UriTemplateBuilder Spec', () => {
  describe('Basics', () => {
    it('The simplest thing.', () => {
      const val = UriTemplateBuilder.from('http://localhost')
        .text(':')
        .simple('port')
        .format();
      expect(val).to.equal('http://localhost:{port}');
    });
    it('This really just appends stuff.', () => {
      const val = UriTemplateBuilder.from('http://localhost')
        .label('tld')
        .simple('port')
        .text('/v1')
        .path('some', 'thing')
        .query('username', 'id')
        .format();
      expect(val).to.equal('http://localhost{.tld}{port}/v1{/some,thing}{?username,id}');
    });

  });
});