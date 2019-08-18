function multi(val) {
  if(val.constructor.name !== 'Array') {
    val = [val];
  }
  return val;
}
class UriTemplateBuilder {

  constructor(base) {
    this.segments = [];
    if(base) {
      this.segments.push(base);
    }
  }

  format() {
    return this.segments.join('');
  }

  text(...values) {
    this.segments.push(...multi(values));
    return this;
  }

  reservedString(...values) {
    const segment = `{+${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  fragment(...values) {
    const segment = `{#${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  label(...values) {
    const segment = `{.${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  path(...values) {
    const segment = `{/${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  pathStyleParameter(...values) {
    const segment = `{;${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  query(...values) {
    const segment = `{?${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  queryContinuation(...values) {
    const segment = `{&${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }
  simple(...values) {
    const segment = `{${multi(values).join(',')}}`;
    this.segments.push(segment);
    return this;
  }

}
UriTemplateBuilder.from = function from(base) {
  return new UriTemplateBuilder(base);
};
module.exports = UriTemplateBuilder;
