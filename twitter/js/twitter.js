// written by Andy Atkinson, November 2007, http://webandy.com

// will just loop through all status in array and add list items
function getTwitterStatuses(data) {
 var ul = document.getElementById("output");
  for( var i=0; i < data.length; i++ ) {
   var text = document.createTextNode(data[i].text);
	var li = document.createElement("li");
	li.appendChild(text);
	ul.appendChild(li);
  }
}