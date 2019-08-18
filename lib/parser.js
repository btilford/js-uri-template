const { Variable, types, separator } = require('./Variable');

const typePattern = /^(\+|#|\.|\/|;|\?|&).+/;
const maxLenPattern = /^(((?!\w+\*).+):(\d+))\*?$/;
const regexChars = /[\\^$.*+?()[\]{}|\/\*]/g;

function parse(uriString) {
  let remaining = uriString;
  const variables = [];

  let start = 0;
  while (start > -1 && remaining.length > 0) {
    start = remaining.search(/\{/);
    if (start > -1) {
      remaining = remaining.substring(Math.min(remaining.length, start + 1));
    }
    const end = remaining.search(/((?!(\{))})/);
    if (end > -1) {

      const template = remaining.substring(0, end);
      remaining = remaining.substring(Math.min(end + 1, remaining.length - 1));

      const src = `{${template}}`;
      let name = template;


      let type;
      if (typePattern.test(name)) {
        type = name.replace(typePattern, '$1');
      }
      if (type) {
        name = name.substring(1);
      }
      else {
        type = '';
      }


      const names = name.split(',').filter(n => n);
      const vars = names.map((_name, idx) => {
        let pattern = '';
        if (idx === 0) {
          pattern += `\\{${type.replace(regexChars, '\\$&')}`;
        } else {
          pattern += ',';
        }
        pattern += _name.replace(regexChars, '\\$&');
        if (idx === names.length - 1) {
          pattern += '\}';
        }

        let maxLen;
        if (maxLenPattern.test(_name)) {
          maxLen = parseInt(_name.replace(maxLenPattern, '$3'));
        }
        if (maxLen) {
          _name = _name.replace(/^(.+)(:\d+)(\*?)$/, '$1$3');
        } else {
          // can't assign earlier because of test
          maxLen = 10000;
        }

        const explode = _name.search(/\*$/);
        if (explode > -1) {
          _name = _name.substring(0, explode);
        }

        return new Variable(src, pattern, _name, type, explode, Math.min(maxLen, 10000))
      });

      variables.push(...vars);

    }

  }
  return variables;


}

module.exports = { parse };
