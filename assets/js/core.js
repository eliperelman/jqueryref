(function () {

	$(function () {
		$('.highlight [lang]').each(function () {
			var el = $(this).addClass('cm-s-ambiance');
			var lang = el.attr('lang');
			var content = el.html();

			CodeMirror.runMode(content, { name: lang }, this);
		});
	});

})();