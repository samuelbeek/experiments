var spinnerDiv;

function displayPhotos(data) {
	var photosDiv = document.getElementById("photos");  
	photosDiv.style.display = "none";  // hid it for now because it will be shown with the effect
	
	var photosArray = data.photos.photo;
	if( photosArray.length > 0 ) {
			for( i=0; i < photosArray.length; i++ ) {
			var photo = photosArray[i];
			var img = document.createElement("img");
			img.src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
				  photo.id + "_" + photo.secret + "_s.jpg";
			img.alt = photosArray[i].title;
			img.title = photosArray[i].title;
			img.className = "flickr";
		
			var link = document.createElement("a");
			// URL example: http://flickr.com/photos/69864550@N00/320622773/
			var url = "http://flickr.com/photos/" + photo.owner + "/" + photo.id;
			link.setAttribute("href", url);						
			link.appendChild(img);
			photosDiv.appendChild(link);
		}
	
		// doing this because DOM is slow, consider replacing DOM manipulation with document.write stuff
		// anonymous function that waits before hiding the spinner and applying the effect
		setTimeout( function() {
			spinnerDiv.style.visibility = "hidden";
			new Effect.BlindDown(photosDiv, arguments[1] || {});
			}, 1000);
	} else {
		var text = document.createTextNode("No results found.");
		photosDiv.appendChild(text);
		spinnerDiv.style.visibility = "hidden";
		photosDiv.style.display = "block";
		new Effect.Highlight(photosDiv,{duration: 2.0});
	}
}

function getPhotos(f) {
	// if there are search results from a previous search, clear them out, thanks Matt!
	// http://matthom.com/archive/2007/05/03/removing-all-child-nodes-from-an-element
	var photosDiv = document.getElementById("photos");
	if ( photosDiv.hasChildNodes() )
	{
		while ( photosDiv.childNodes.length >= 1 ) {
			photosDiv.removeChild( photosDiv.firstChild );  
		} 
	}

	var query = f.elements["field"].value; //get keyword from search textbox	
	if( query != "" ) {  // if the field textbox contains a value
			// show the spinner to indicate progress, getting photos
			spinnerDiv = document.getElementById("spinnerDiv");
			spinnerDiv.style.visibility = "visible";
			var url = "http://www.flickr.com/services/rest/?format=json&method=flickr.photos.search&text=" +
			query + "&api_key=36393f586f696d1e5396f439562724e2&per_page=20&jsoncallback=displayPhotos";  //callback function
			var s = document.createElement("script");
			s.setAttribute("type", "text/javascript");
			s.setAttribute("src", url);
			document.getElementsByTagName("head")[0].appendChild(s);
	} else {
		alert("Error: no keywords.\nPlease provide keywords to search with.");
	}
}

// check if the key pressed was enter, which has code '13' 
// if the key was enter, then call the getPhotos function and pass a reference
function checkKey(e) {
	if( window.event ) {  // IE, access form in different way
		if( window.event.keyCode == 13) {
			var form = document.forms[0];
			getPhotos( form );
			return false;  // REQUIRED to prevent form submission
		}
	} else {
		if( e.keyCode == 13 ) { // FF, access form different from IE
			getPhotos(e.target.form);
			return false;  // REQUIRED to prevent form submission
		}
	}
}