(function () {
	var syntaxHighlight = function () {
		$('div:not(.highlighted) pre code').each(function () {
			var el = $(this);
			var content = el.html();
			var lang = el.attr('class');

			el.closest('pre')
				.addClass('cm-s-ambiance')
				.wrap('<div class="highlighted" />');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	}

	$(function () {
		syntaxHighlight();
	});

})();