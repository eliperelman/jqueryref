var marked = require('marked');

marked.setOptions({
	sanitize: false,
	gfm: false
});

module.exports = marked;