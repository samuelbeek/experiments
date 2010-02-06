/*
  For URL parameters, see the Google API docs.
  URL: http://code.google.com/apis/chart/
  
  By: Andy Atkinson, http://webandy.com
*/
var base_url = "http://chart.apis.google.com/chart?";
var keys = new Array();
var values = new Array();
var chart_type;
var chartDiv;
var rowCount = 1;
  
/*
  Zero out the arrays and remove any previous chart
  nodes from the chart div.
*/
function initializeForm(form) {
  keys.length = 0;
  values.length = 0;
  chartDiv = document.getElementById("chart");
  if ( chartDiv.hasChildNodes() ) {
	while ( chartDiv.childNodes.length >= 1 ) {
		chartDiv.removeChild( chartDiv.firstChild );  
	} 
  }
  getKeysAndValues(form);
}

/*
  Build up labels and inputs for table rows, where
  users can put in keys and values
*/
function addRow(table) {
	table = document.getElementById(table);
	var lastRow = table.rows.length;
	new_row = table.insertRow(lastRow - 2);  //2 because there is a spacer row
	
	// incremement counter, then convert to string
	rowCount++;
	var rowCountStr = rowCount + '';
    
    var key_label = document.createElement("label");
    var txt1 = "key" + rowCountStr;
    var txt1_node = document.createTextNode(txt1);
    key_label.setAttribute("for", txt1);
    key_label.appendChild(txt1_node);
  
    var key_input = document.createElement("input");
    key_input.setAttribute("name", ("key" + rowCountStr) );
    key_input.setAttribute("id", ("key" + rowCountStr) );
    key_input.setAttribute("type", "text");
    
    var value_label = document.createElement("label");
    var txt2 = "value" + rowCountStr;
    var txt2_node = document.createTextNode(txt2);
    value_label.setAttribute("for", txt2)
    value_label.appendChild(txt2_node);
  
    var value_input = document.createElement("input");
    value_input.setAttribute("name", ("value" + rowCountStr) );
    value_input.setAttribute("id", ("value" + rowCountStr) );
    value_input.setAttribute("type", "text");
  
	key_cell = new_row.insertCell(0);
    key_cell.appendChild(key_label);
    key_cell.appendChild(key_input);
    
    value_cell = new_row.insertCell(1);
    value_cell.appendChild(value_label);
    value_cell.appendChild(value_input);
}


/*
  Add key and value inputs to arrays
*/
function getKeysAndValues(form) {
  for(var i=0; i < form.elements.length; i++) {
    if( form.elements[i].type == "text" ) {
      var item = form.elements[i].value;
      if( item.length > 0 ) {
        i % 2 == 0 ? keys.push(item) : values.push(item) 
      }
    } else if( form.elements[i].type == "select-one") {
      chart_type = form.elements[i].value;
    }
  }
  displayChart();
}


/*
  Keys come at the end of the URL and are delimited by vertical bars.  Values
  are earlier in the URL and are delimited by commas.  Calling Array.join() will 
  conver the array to a string with the specified delimiter.  For an example
  URL see to the Google Charts API docs.
*/
function displayChart() {
  var keys_str = (keys.length == 1) ? keys[0] : keys.join("|");
  var values_str = (values.length == 1) ? values[0] : values.join();	
   
  var url = base_url + "cht=" + chart_type + "&chd=t:" + values_str + "&chs=600x200&chl=" + keys_str;
    
  var img = document.createElement("img");
  img.setAttribute("src", url);						
  img.setAttribute("alt", "Google chart");
  
  chartDiv.appendChild(img);
}
