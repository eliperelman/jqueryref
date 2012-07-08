(function () {

	$(function () {
		$('pre code[class*="lang-"]').each(function () {
			var el = $(this);

			el.closest('pre').addClass('cm-s-ambiance');
			// var lang = el.attr('lang');
			// var content = el.html();

			// CodeMirror.runMode(content, { name: lang }, this);
		});
	});

})();