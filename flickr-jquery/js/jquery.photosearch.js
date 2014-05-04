// (c) 2009 Andy Atkinson http://andyatkinson.com
// jquery flickr public photo search plugin
(function($) {
	$.fn.photosearch = function(options) {
		var defaults = {
			tagMode: 'all', 
			errorText: 'No photos found.'
		};
		var options = $.extend(defaults,options);
		
		return this.each(function() {
			obj = $(this);
			
			$('#images').after('<div class="error">'+options.errorText+'</div>');
			var error = $('.error').hide();
			var button = obj.find('.button');
			var progress = $('.progress');
			
			function getPhotos() {
				progress.show();
				$('#images img').fadeOut();
				var tags = $('.tags').val();
				if(tags == '' || tags.length == 0) {
					progress.hide();
					error.show();
				} else {
					error.hide();
					$('#images img').remove();
					tags = tags.split(' ').join(',')
					$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=" + tags + "&tagmode="+options.tagMode+"&format=json&jsoncallback=?", function(data){
					  $.each(data.items, function(i,item){
					    $("<img/>").attr("src", item.media.m).appendTo("#images")
					      .wrap("<a href='" + item.link + "'></a>").hide();
					    if ( i == 3 ) {
								$('img').fadeIn();
								progress.hide();
								return false;
							}
					  });
					});
				}	
			}
			button.click(function(e) {
				e.preventDefault();
				getPhotos();
			});
			obj.submit(function(e) {
				e.preventDefault();
				getPhotos();
			});
		});
	};
})(jQuery);
