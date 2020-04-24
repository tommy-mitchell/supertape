'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => 'node bin/supertape \'test/*.js\'',
    'watch:test': () => 'nodemon -w lib -w test -x "npm test"',
    'lint': () => 'putout bin lib test .madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => 'nyc npm test',
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

