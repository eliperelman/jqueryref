(function () {
	var syntaxHighlight = function () {
		$('pre code:not(.highlighted)').each(function () {
			var el = $(this).addClass('highlighted');
			var content = el.html();
			var lang = el.attr('class');

			el.closest('pre').addClass('cm-s-ambiance');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	}

	$(function () {
		syntaxHighlight();
	});

})();