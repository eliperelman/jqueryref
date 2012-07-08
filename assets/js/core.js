(function () {

	$(function () {
		$('pre code[class*="lang-"]').each(function () {
			var el = $(this);
			var content = el.html();
			var lang = 'javascript';

			el.closest('pre').addClass('cm-s-ambiance');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	});

})();