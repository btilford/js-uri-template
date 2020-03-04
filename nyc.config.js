
module.exports = {
  all: true,
  include: 'lib/**/*.js',
  reporter: [
    'json',
    'lcov',
    'text'
  ],
  'report-dir': 'coverage',
  'check-coverage': true,

  branches: [80, 90],
  lines: [80, 90],
  functions: [90, 100],
  statements: [90, 100]

};