(function($, d, w) {
	//stupid helper
	Handlebars.registerHelper('flatten', function(data) {
		console.log(data);
		return data.join(', ');
	});

	//get the data and display it
	$.ajax({
		url: 'data.json',
		success: function(data) {
			$('#wrapper').html(App.templates["main"](data));
		}
	})
})(jQuery, document, window);