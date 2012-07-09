(function () {
	var syntaxHighlight = function () {
		$('pre code:not(.highlighted)').each(function () {
			var el = $(this);
			var content = el.html();
			var lang = el.attr('class');

			el
				.addClass('highlighted')
				.closest('pre')
					.addClass('cm-s-ambiance');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	}

	$(function () {
		syntaxHighlight();
	});

})();