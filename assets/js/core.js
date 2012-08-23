(function () {
	var syntaxHighlight = function () {
		$('div:not(.highlighted) pre code').each(function () {
			var el = $(this);
			var content = el.html();
			var lang = el.attr('class');

			CodeMirror.runMode(content, { name: lang },
				el.closest('pre')
					.addClass('cm-s-ambiance')
					.wrap('<div class="highlighted" />')[0] );
		});
	}

	$(function () {
		syntaxHighlight();
	});

	$('.fiddle:not(.embedded)')
		.addClass('embedded')
		.each(function () {
			var el = $(this);
			var id = el.attr('id');

			el.html('<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/jqueryref/' + id + '/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>');
		});

})();