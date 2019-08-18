const types = new Set([
  '+',
  '#',
  '.',
  '/',
  ';',
  '?',
  '&'
]);

function typeName(type) {
  let name;
  switch (type) {
    case '+':
      name = 'string';
      break;
    case '#':
      name = 'fragment';
      break;
    case '.':
      name = 'label';
      break;
    case '/':
      name = 'path segment';
      break;
    case ';':
      name = 'path-style parameter';
      break;
    case '?':
      name = 'query';
      break;
    case '&':
      name = 'query continuation';
      break;
    default:
      name = 'simple';
  }
  return name;
}

function separator(type, explode) {
  let separator;
  if (explode) {
    switch (type) {
      case '.':
        separator = '.';
        break;
      case '/':
        separator = '/';
        break;
      case ';':
        separator = ';';
        break;
      case '?':
        separator = '&';
        break;
      case '&':
        separator = '&';
        break;
      default:
        separator = ',';
    }
  } else {
    separator = ',';
  }
  return separator;
}



const assignments = new Set(['?', '&', ';']);
const encoded = new Set(['?', '&', ';', '/', '', '#', '+']);

function prefix(type) {
  let result;
  switch (type.value) {
    case '.':
      result = '';
      break;
    default:
      result = type.value;
  }
  return result;
}

class Variable {

  constructor(src, pattern, name, type = '', explode = -1, maxLen = 10000) {
    this.src = src;
    this.name = name;
    this.explode = explode > -1;
    this.maxLen = maxLen;
    this.separator = separator(type, this.explode);

    this.type = {
      name: typeName(type),
      value: type
    };
    this.prefix = prefix(this.type);
    this.pattern = pattern;
    this.regex = new RegExp(pattern, 'g');
  }

  expand(values) {
    if (!values || values.constructor.name !== 'Array') {
      values = [values];
    }
    const encodedVals = values.filter(val => val !== undefined && val !== null)
      .map(val => {
        if (val.length > this.maxLen) {
          val = val.substring(0, this.maxLen);
        }
        let value;
        const encodedVal = encoded.has(this.type.value) ? encodeURIComponent(val) : val;
        if (assignments.has(this.type.value)) {
          if(val) {
            value = `${this.name}=${encodedVal}`;
          }
          else {
            // If the value is empty '' we still include it for *assignment* style
            // variables.
            value = this.name;
          }
        } else {
          value = encodedVal;
        }

        return value;
      });
    const value = encodedVals.join(this.separator);


    // If the value is null or undefined this variable disappears.
    const str = value ? `${this.prefix}${value}` : '';
    const expansion = {
      str,
      value,
    };

    return new ExpandedVariable(expansion, this);
  }

}

class ExpandedVariable extends Variable {

  constructor(expansion, other) {
    super(other.src, other.pattern, other.name, other.type, other.explode, other.maxLen);
    this.expansion = expansion;
  }

  expand(...values) {
    const more = super.expand(...values);
    const expansion = {
      ...more,
      str: `${this.expansion.str}${this.separator}${more.expansion.str}`,
    };
    return new ExpandedVariable(expansion, this);
  }
}

module.exports = { Variable, separator, types, typeName };
