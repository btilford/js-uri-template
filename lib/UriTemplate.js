const { parse } = require('./parser');


class UriTemplate {

  constructor(uriString, variables = []) {
    this.uri = uriString;
    this.variables = {};
    variables.forEach(v => {
      this.variables[v.name] = v;
    });
  }

  names() {
    return Object.keys(this.variables);
  }

  expand(data = {}) {
    const varsCopy = { };
    this.names().forEach(v => {
      varsCopy[v] = this.variables[v];
    });

    Object.keys(data).forEach(name => {
      let expanded;
      const val = varsCopy[name];
      if (val) {
        expanded = val.expand(data[name]);
        varsCopy[name] = expanded;
      }
    });

    const vars = Object.keys(varsCopy).map(name => varsCopy[name]);
    return new UriTemplate(this.uri, vars);
  }

  format(includeUnexpanded = true) {
    const values = Object.keys(this.variables).map(k => this.variables[k]);

    const result = values.reduce((uri, val) => {
      let formatted;
      if (val.expansion) {
        formatted = uri.replace(val.regex, val.expansion.str);
      } else if (!includeUnexpanded) {
        formatted = uri.replace(val.regex, '');
      }
      else {
        formatted = uri;
      }
      return formatted;
    }, this.uri);

    return result.replace(/((?!\w+:\/\/))(.*\w+)\/\//g, '$2/');
  }

}

UriTemplate.parse = function (uriString) {
  const vars = parse(uriString);
  return new UriTemplate(uriString, vars);
};

module.exports = UriTemplate;
