module.exports = function (grunt) {
	var tasks = [
		'markdown',
		'initdeploy',
		'template',
		'generateapi',
		'copy',
		'clean',
		'push'
	];

	tasks.forEach(function (task) {
		require('./' + task)(grunt);
	});
};