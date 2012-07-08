(function () {
	var mimes = {
		html: 'text/html',
		css: 'text/css',
		javascript: 'text/javascript'
	};


	$(function () {
		$('.highlight [lang]').each(function () {
			var el = $(this);
			var lang = el.attr('lang');
			var content = el.text();

			CodeMirror.runMode(content, mimes[lang], el[0]);
		});
	});


})();