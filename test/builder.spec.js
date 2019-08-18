const chai = require('chai');
const TemplateBuilder = require('../lib/TemplateBuilder');
const { expect } = chai;


describe('TemplateBuilder spec', () => {
  describe('basics', () => {
    it('simplest thing', () => {
      const val = TemplateBuilder.from('http://localhost')
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