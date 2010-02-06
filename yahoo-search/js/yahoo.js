// By Andy Atkinson, November 2008, http://webandy.com

// After making JSON request to Yahoo! Search API, will loop through 
// results in ResultSet and add a list item for each Result
function showSearchResults(data) {
 var ul = document.getElementById("searchResults");
 if( ul.childNodes.length > 0 ) {
  ul.innerHTML = "";
 }
 for(var i=0; i < data.ResultSet.Result.length; i++) {
  var title = document.createTextNode( data.ResultSet.Result[i].Title );
  var urlText = data.ResultSet.Result[i].Url;
  var urlTextNode = document.createTextNode(urlText);
  var link = document.createElement("a");
  link.setAttribute("href", urlText );
  link.appendChild( title );
  var brk = document.createElement("br");
  var li = document.createElement("li");
  li.appendChild(link);
  li.appendChild(brk);
  li.appendChild(urlTextNode);
  ul.appendChild(li);
 }
}

// Dynamically build up the query to send to the Yahoo! Search API
// Request JSON as the response
function buildSearchQuery(f) {
 var query = f.elements["textfield"].value;
 var url = "http://api.search.yahoo.com/WebSearchService/V1/webSearch?appid=YahooDemo&query=" +
			query + "&output=json&callback=showSearchResults";
 var s = document.createElement("script");
 s.setAttribute("type","text/javascript");
 s.setAttribute("language","JavaScript");
 s.setAttribute("src",url);
 document.getElementsByTagName("head")[0].appendChild(s);
}