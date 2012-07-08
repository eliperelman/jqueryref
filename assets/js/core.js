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
			var code = el.html();

			el.empty();

			CodeMirror(this, {
				value: code,
				mode: lang,
				lineNumbers: false,
				readOnly: true
			});



			// var el = $(this);
			
			// var content = el.text();

			// CodeMirror.runMode(content, mimes[lang], el[0]);
		});
	});


})();