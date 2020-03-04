const chai = require('chai');
const { parse } = require('../lib/parser');
const { expect } = chai;

describe('parser spec', () => {
  describe('single var templates', () => {
    it('default "simple" var type', () => {
      const result = parse('http://abc/{pathVar}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('simple');
      expect(variable.name).to.equal('pathVar');
      expect(variable.src).to.equal('{pathVar}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('label var type (.)', () => {
      const result = parse('http://abc{.tld}/');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('label');
      expect(variable.name).to.equal('tld');
      expect(variable.src).to.equal('{.tld}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('reserved string var type (+)', () => {
      const result = parse('http://abc/{+xyz}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('string');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{+xyz}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('fragment var type (#)', () => {
      const result = parse('http://abc{#xyz}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('fragment');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{#xyz}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('path segment var type (/)', () => {
      const result = parse('http://abc{/xyz}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('path segment');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{/xyz}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('path parameter var type (;)', () => {
      const result = parse('http://abc/xyz{;param}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('path-style parameter');
      expect(variable.name).to.equal('param');
      expect(variable.src).to.equal('{;param}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('query var type (?)', () => {
      const result = parse('http://abc{?xyz}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('query');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{?xyz}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('query var type (&)', () => {
      const result = parse('http://abc?mnl=p{&xyz}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('query continuation');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{&xyz}');
      expect(variable.explode).to.equal(false);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
  });


  describe('explode vars', () => {
    it('default "simple" var type', () => {
      const result = parse('http://abc/{pathVar*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('simple');
      expect(variable.name).to.equal('pathVar');
      expect(variable.src).to.equal('{pathVar*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('label var type', () => {
      const result = parse('http://abc{.tld*}/');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('label');
      expect(variable.name).to.equal('tld');
      expect(variable.src).to.equal('{.tld*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal('.');
    });
    it('reserved string var type', () => {
      const result = parse('http://abc/{+xyz*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('string');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{+xyz*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('fragment var type', () => {
      const result = parse('http://abc{#xyz*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('fragment');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{#xyz*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal(',');
    });
    it('path segment var type', () => {
      const result = parse('http://abc{/xyz*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('path segment');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{/xyz*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal('/');
    });
    it('query "?" var type', () => {
      const result = parse('http://abc{?xyz*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('query');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{?xyz*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal('&');
    });
    it('query "&" var type', () => {
      const result = parse('http://abc?mnl=p{&xyz*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.type.name).to.equal('query continuation');
      expect(variable.name).to.equal('xyz');
      expect(variable.src).to.equal('{&xyz*}');
      expect(variable.explode).to.equal(true);
      expect(variable.maxLen).to.equal(10000);
      expect(variable.separator).to.equal('&');
    });
  });
  describe('max len vars', () => {
    it('defaults to 10k', () => {
      const result = parse('http://abc?mnl=p{&xyz*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.maxLen).to.equal(10000);
    });
    it('parses modifiers correctly', () => {
      const result = parse('http://abc?mnl=p{&xyz:30*}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.maxLen).to.equal(30);
    });
    it('prevents larger than 10k', () => {
      const result = parse('http://abc?mnl=p{&xyz:30000000}');
      expect(result).to.have.lengthOf(1);
      const [variable] = result;
      expect(variable.maxLen).to.equal(10000);
    });
    it('does not allow maxLen after explode', () => {
      const result = parse('http://abc?mnl=p{&xyz*:3}');
      expect(result[0].maxLen).to.equal(10000);
      expect(result[0].explode).to.equal(false);
    });
    it('does allow maxLen before explode', () => {
      const result = parse('http://abc?mnl=p{&xyz:3*}');
      expect(result[0].maxLen).to.equal(3);
      expect(result[0].explode).to.equal(true);
    });
  });
  describe('multiple vars', () => {
    it('parses each item to a Variable', () => {
      const result = parse('http://{/x,y,z}');
      expect(result).to.have.lengthOf(3);
      expect(result[0].name).to.equal('x');
      expect(result[1].name).to.equal('y');
      expect(result[2].name).to.equal('z');
      result.forEach(variable => {
        expect(variable.type.value).to.equal('/');
      });
    });
    describe('exploded vars', () => {
      it('handles exploded vars at in the last slot', () => {
        const result = parse('https://somwhere.com?x=y{&alpha,be-ta,c*}');
        expect(result).to.have.lengthOf(3);
        expect(result[0].name).to.equal('alpha');
        expect(result[0].explode).to.equal(false);

        expect(result[1].name).to.equal('be-ta');
        expect(result[1].explode).to.equal(false);

        expect(result[2].name).to.equal('c');
        expect(result[2].explode).to.equal(true);
      });
      it('handles exploded vars at in the first slot', () => {
        const result = parse('https://somwhere.com?x=y{&alpha*,be-ta,c}');
        expect(result).to.have.lengthOf(3);
        expect(result[0].name).to.equal('alpha');
        expect(result[0].explode).to.equal(true);

        expect(result[1].name).to.equal('be-ta');
        expect(result[1].explode).to.equal(false);

        expect(result[2].name).to.equal('c');
        expect(result[2].explode).to.equal(false);
      });
      it('handles exploded vars at in all slots', () => {
        const result = parse('https://somwhere.com?x=y{&alpha*,be-ta*,c*}');
        expect(result).to.have.lengthOf(3);
        expect(result[0].name).to.equal('alpha');
        expect(result[0].explode).to.equal(true);

        expect(result[1].name).to.equal('be-ta');
        expect(result[1].explode).to.equal(true);

        expect(result[2].name).to.equal('c');
        expect(result[2].explode).to.equal(true);
      });
    });

    describe('maxlen vars', () => {
      it('handles maxLen vars in the last slot', () => {
        const result = parse('https://somwhere.com?x=y{&alpha,be-ta,c:10}');
        expect(result).to.have.lengthOf(3);
        expect(result[0].name).to.equal('alpha');
        expect(result[0].maxLen).to.equal(10000);

        expect(result[1].name).to.equal('be-ta');
        expect(result[1].maxLen).to.equal(10000);

        expect(result[2].name).to.equal('c');
        expect(result[2].maxLen).to.equal(10);
      });
      it('handles maxLen vars at in the first slot', () => {
        const result = parse('https://somwhere.com?x=y{&alpha:11,be-ta,c}');
        expect(result).to.have.lengthOf(3);
        expect(result[0].name).to.equal('alpha');
        expect(result[0].maxLen).to.equal(11);

        expect(result[1].name).to.equal('be-ta');
        expect(result[1].maxLen).to.equal(10000);

        expect(result[2].name).to.equal('c');
        expect(result[2].maxLen).to.equal(10000);
      });
      it('handles exploded vars at in all slots', () => {
        const result = parse('https://somwhere.com?x=y{&alpha:1,be-ta:2,c:3}');
        expect(result).to.have.lengthOf(3);
        expect(result[0].name).to.equal('alpha');
        expect(result[0].maxLen).to.equal(1);

        expect(result[1].name).to.equal('be-ta');
        expect(result[1].maxLen).to.equal(2);

        expect(result[2].name).to.equal('c');
        expect(result[2].maxLen).to.equal(3);
      });
    });
  });

});
