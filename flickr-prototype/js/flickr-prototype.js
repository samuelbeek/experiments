var Flickr = Class.create({	
	
	appendPhotoLinks: function(data) {
		var container = $('container');
		
		var photos = data.photos.photo;
		$('spinnerDiv').hide();
		
		if(photos.length < 1)
		{
			var text = document.createTextNode("No results found.");
			container.appendChild(text);
			new Effect.Highlight(container,{duration: 2.0});
		} 
		else 
		{
			photos.each(function(photo) {
				var img = document.createElement("img");
				img.src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
					  photo.id + "_" + photo.secret + "_s.jpg";
				img.alt = photo.title;
				img.title = photo.title;
				img.className = "flickr";

				var link = document.createElement("a");
				// URL example: http://flickr.com/photos/69864550@N00/320622773/
				var url = "http://flickr.com/photos/" + photo.owner + "/" + photo.id;
				link.setAttribute("href", url);		

				link.hide();												
				link.appendChild(img);
				container.appendChild(link);		
			});
			Flickr.prototype.displayPhotos();
		}		
	},
	displayPhotos: function() {
		
		var photos = $$('div#container a');
		photos.each(function(photo) {
			Effect.Appear(photo, { duration: 3.0 });
		});		
	},
	getPhotos: function(text) {

		// remove child nodes, TODO: update me
		var container = $('container');
		if( container.hasChildNodes() ) {
		    while( container.childNodes.length >= 1) {
		     	container.removeChild( container.firstChild );  
	   		} 
		}
		
		// check if no search text is supplied
		// should I be escaping the search text?		
							
		$('spinnerDiv').show();
		
		var url = "http://www.flickr.com/services/rest/?format=json&method=flickr.photos.search&text=" +
		text + "&api_key=36393f586f696d1e5396f439562724e2&per_page=20&jsoncallback=Flickr.prototype.appendPhotoLinks"; 
		
		var s = document.createElement("script");
		s.setAttribute("type", "text/javascript");
		s.setAttribute("src", url);
		document.getElementsByTagName("head")[0].appendChild(s);
	},
	onKeyPress: function(e) {		
		if( window.event ) {  // IE, access form in different way
			if( window.event.keyCode == 13) {
				var form = document.forms[0];
				getPhotos( form );
				return false;  // REQUIRED to prevent form submission
			}
		} else {
			if( e.keyCode == 13 ) { // FF, access form different from IE
				var text = $('search-text').getValue();
				this.Flickr.prototype.getPhotos(text); // TODO update with correct binding
				//return false;  // REQUIRED to prevent form submission
				Event.stop(e);
			}
		}
	}
});

Event.observe(window, 'load', function() {
	var spinner = $('spinnerDiv').hide();
	var flickr = new Flickr();
	// $('search-form').observe('change', this.checkKey.bind(this));
	Event.observe('search-text', 'change', flickr.checkKey);
	
	// flickr.observe('search-text', 'keydown', this.onKeyPress); ?
	Event.observe('search-text', 'keydown', flickr.onKeyPress.bindAsEventListener(this));
	Event.observe('search-text', 'keypress', flickr.onKeyPress);
	
	Event.observe('search-button', 'click', function(event) {
		var text = $('search-text').getValue();
		flickr.getPhotos(text);
	});
})