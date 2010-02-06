// Written by Andy Atkinson, November 2007, http://webandy.com

function getBookmarks(data) {
 var ul = document.getElementById("bookmarks");
 for( var i=0; i < data.length; i++ ) {
  var title = document.createTextNode( data[i].d ); // Title of the bookmark
  var notes = document.createTextNode( data[i].n ); // Notes about the bookmark
  var url = data[i].u; // The URL for the bookmark
  
  var link = document.createElement("a");
   link.setAttribute("href", url);
   link.appendChild(title);
  var brk = document.createElement("br");
  var li = document.createElement("li");
  li.appendChild(link);
  li.appendChild(brk);
  if( notes.nodeValue != "undefined" ) li.appendChild(notes);
  ul.appendChild(li);	
 }
}