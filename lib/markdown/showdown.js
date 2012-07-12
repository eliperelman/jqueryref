var showdown = require('showdown');
var converter = new showdown.converter();

module.exports = converter.makeHtml;