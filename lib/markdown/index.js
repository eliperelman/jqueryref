var showdown = require('./showdown');
var marked = require('./marked');
var _ = require('lodash');

module.exports = _.compose(marked, showdown);