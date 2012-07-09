(function () {
	var syntaxHighlight = function () {
		$('div:not(.highlighted) pre code').each(function () {
			var el = $(this);
			var content = el.html();
			var lang = el.attr('class');

			el.closest('pre')
				.wrap('<div class="highlighted cm-s-ambiance" />');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	}

	$(function () {
		syntaxHighlight();
	});

})();