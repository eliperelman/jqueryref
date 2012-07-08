(function () {
	var mimes = {
		html: 'text/html',
		css: 'text/css',
		javascript: 'text/javascript'
	};


	$(function () {
		$('.highlight').each(function () {
			var el = $(this);
			var langEl = el.find('[lang]');
			var lang = langEl.attr('lang');
			var content = langEl.text();

			CodeMirror.runMode(content, mimes[lang], langEl[0]);
		});
	});


})();