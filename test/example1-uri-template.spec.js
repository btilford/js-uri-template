const chai = require('chai');
const { UriTemplate } = require('../index');
const { expect } = chai;


describe('1. Example - UriTemplate', () => {
  describe('Basics', () => {
    it('The simplest expansion', () => {
      const val = UriTemplate.parse('https://xyz/{name}')
        .expand({
          name: 'abc'
        })
        .format();

      expect(val).to.equal('https://xyz/abc');
    });
    it('A bit more', () => {
      const val = UriTemplate.parse('https://app{.host*}{/version,path*}{?a,b,c*}{#some-id}')
        .expand({
          host: ['acme', 'com'],
          path: ['some', 'thing'],
          version: 'v2',
          a: 'A',
          b: 'B',
          c: 'the letter c',
          'some-id': 'thing 1'
        })
        .format();

      expect(val).to.equal('https://app.acme.com/v2/some/thing?a=A?b=B?c=the%20letter%20c#thing%201');
    });

  });

  describe('Chained Expansion', () => {
    const template = 'https://app{.env}/path/{/id}';

    it('Allows leaving the template in tact after adding a hostname', () => {
      let uriTemplate = UriTemplate.parse(template);
      uriTemplate = uriTemplate.expand({ env: 'localhost' });

      const val = uriTemplate.format();
      expect(val).to.equal('https://app.localhost/path/{/id}');
    });
    it('And afterwards adding the rest of the params.', () => {
      let uriTemplate = UriTemplate.parse(template);
      uriTemplate = uriTemplate.expand({ env: 'localhost' });

      const val = uriTemplate.expand({ id: 123 })
        .format();

      expect(val).to.equal('https://app.localhost/path/123');
    });
    it('You can drop unexpanded parameters.', () => {
      let uriTemplate = UriTemplate.parse(template);
      uriTemplate = uriTemplate.expand({ env: 'localhost' });

      const val = uriTemplate.format(false);

      expect(val).to.equal('https://app.localhost/path/');
    });

  });
  describe('Exploded and chained expansion', () => {
    const template = 'http://some.thing{?type*}';
    it('Adds to the exploded var each call', () => {
      const parsed = UriTemplate.parse(template);
      const first = parsed.expand({ type: 'a' });
      const second = first.expand({ type: ['b', 'c'] });
      const end = second.format();
      expect(end).to.equal('http://some.thing?type=a&type=b&type=c');
    });
  });


  // https://github.com/btilford/js-uri-template/issues/1
  describe('Partially applied expansion issue', () => {
    const template = UriTemplate.parse('{/seg1,seg2,seg3}')
      .expand({ seg1: 'a', seg3: 'c' });

    it('Outputs incorrectly if unexpanded variables are kept', () => {
      expect(template.format()).to.equal('/a,seg2/c');
    });

    it('Output correctly if unexpanded variables are dropped.', () => {
      expect(template.format(false)).to.equal('/a/c');
    });
  });

  describe('Handling variable types', () => {
    it('Label "{.xyz}" variables', () => {
      const val = UriTemplate.parse('file{.extension}')
        .expand({ extension: 'js' })
        .format();

      expect(val).to.equal('file.js');
    });
    it('Fragment "{#id}" variables', () => {
      const val = UriTemplate.parse('/path{#id}')
        .expand({ id: 'section 1' })
        .format();

      expect(val).to.equal('/path#section%201');
    });
    it('Path segment "{/id}" variables', () => {
      const val = UriTemplate.parse('/path{/id}')
        .expand({ id: '123' })
        .format();

      expect(val).to.equal('/path/123');
    });
    it('Path style param "{;id}" variables', () => {
      const val = UriTemplate.parse('/path{;id}')
        .expand({ id: '123' })
        .format();

      expect(val).to.equal('/path;id=123');
    });
    it('Query "{?id}" variables', () => {
      const val = UriTemplate.parse('/path{?id}')
        .expand({ id: '123' })
        .format();

      expect(val).to.equal('/path?id=123');
    });
    it('Query continuation "{&offset}" variables', () => {
      const val = UriTemplate.parse('/path?limit=100{&offset}')
        .expand({ offset: '300' })
        .format();

      expect(val).to.equal('/path?limit=100&offset=300');
    });
    it('Reserved string "{+host}" variables', () => {
      const val = UriTemplate.parse('{+host}/login')
        .expand({ host: 'https://nowhere.test' })
        .format();

      expect(val).to.equal('https://nowhere.test/login');
    });

  });
  describe('Variable lists', () => {
    it('Any type can have a list of variable slots.', () => {
      const val = UriTemplate.parse('https://api{.env,host}{/version,path}')
        .expand({
          env: 'dev',
          host: 'xyz.com',
          version: 'v2',
          path: 'resource/xyz'
        })
        .format();

      expect(val).to.equal('https://api.dev.xyz.com/v2/resource/xyz');
    });
  });
  describe('Value lists', () => {
    it('Without explode "*".', () => {
      const val = UriTemplate.parse('{/paths}')
        .expand({
          paths: ['bin', '/etc']
        })
        .format();

      expect(val).to.equal('/bin,/etc');
    });
    it('With explode "*".', () => {
      const val = UriTemplate.parse('{/paths*}')
        .expand({
          paths: ['/usr/bin', 'bash']
        })
        .format();

      expect(val).to.equal('/usr/bin/bash');
    });
    it('When path-style parameter list', () => {
      const val = UriTemplate.parse('/abc{;param1*,param2}')
        .expand({
          param1: ['a', 'b'],
          param2: ['c']
        })
        .format();
      expect(val).to.equal('/abc;param1=a,b;param2=c');
    });
  });
  describe('Max Length', () => {
    it('You can provide max length "{?code:1}" (default is 10,000)', () => {
      const val = UriTemplate.parse('{?code:1}')
        .expand({ code: 'four' })
        .format();

      expect(val).to.equal('?code=f');
    });
    it('Max Length needs to be before any explode', () => {
      const good = UriTemplate.parse('{?code:1*}')
        .expand({ code: ['four', 'x'] })
        .format();

      expect(good).to.equal('?code=f&code=x');

      const bad = UriTemplate.parse('{?code*:1}')
        .expand({ code: ['four', 'x'] })
        .format();

      expect(bad).to.equal('{?code*:1}');
    });
  });
  describe('Special values', () => {
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
