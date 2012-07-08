(function () {

	$(function () {
		$('pre code[class*="lang-"]').each(function () {
			var el = $(this);
			var content = el.html();
			var lang = _.reduce( el.attr('class').split(' '), function (acc, value) {
				if (value.indexOf('lang-') === -1) {
					return acc;
				}

				return value.substring(5);
			});

			el.closest('pre').addClass('cm-s-ambiance');

			CodeMirror.runMode(content, { name: lang }, this);
		});
	});

})();