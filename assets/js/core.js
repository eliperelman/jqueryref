(function () {
	var syntaxHighlight = function () {
		$('pre code[class*="lang-"]:not(.highlighted)').each(function () {
			var el = $(this).addClass('highlighted');
			var content = el.html();
			var lang = 'javascript';

			el.closest('pre').addClass('cm-s-ambiance');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	}

	$(function () {
		syntaxHighlight();
	});

})();