/* Property of Andy Atkinson, 2008, please contact if interested in using http://webandy.com */

var gEventSource;

/* 	simile timeline widget - http://simile.mit.edu/timeline/
	source for widget loaded from external resource
	onResize function is provided from SIMILE docs 
*/
function onLoad() {
  gEventSource = new Timeline.DefaultEventSource();
  var bandInfos = [
    Timeline.createBandInfo({
        eventSource:    gEventSource,
        date:           "Jun 28 2008 00:00:00 GMT",  //should set date to now?
        width:          "60%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 100
    }),
    Timeline.createBandInfo({
        eventSource:    gEventSource,
        date:           "Jun 28 2008 00:00:00 GMT",
        width:          "40%", 
        intervalUnit:   Timeline.DateTime.YEAR, 
        intervalPixels: 200
    })
  ];
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;
  tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
  document.getElementById("calendar-id").value = "usa@holiday.calendar.google.com";
}

/* onResize function is provided from SIMILE docs */
var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}

/*
   Get the calendar id, e.g. "usa@holiday.calendar.google.com" from the form textfield
*/
function getCalendarEvents(form) {
  var id  = form.elements["calendar-id"].value;
  getFeed(id);
}

/* Dynamically create the script tag to make the web service call to Google Calendar, and request JSON response, and specify callback function name "displayResults" */
function getFeed(calendar_id) {
  var feedUrl = "http://www.google.com/calendar/feeds/" + calendar_id + "/public/full?alt=json-in-script&start-min=2006-04-01T00:00:00&callback=displayResults&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true";
  var scriptTag = document.createElement('script');
  scriptTag.src = feedUrl;
  document.getElementsByTagName("head")[0].appendChild(scriptTag);
}

/* Build up event sources from JSON response,  refer to Timeline.DefaultEventSource.prototype.loadJSON in source */
function displayResults(json) {
  var entries = json.feed.entry;
  var timelinerEntries = [];
  for (var i = 0; i < entries.length; ++i) {
    var entry = entries[i];
    var when = entry["gd$when"][0];
    var start = convertFromGDataDate(when.startTime);
    var end = convertFromGDataDate(when.endTime);
    var webContent;
    var links = entry.link;
    if( links.length > 1 ) {
	  webContent = links[0];   //don't know what second link is,  TODO: figure that out
	}
    var title = entry.title.$t;
    var link = webContent.url;
    var icon = webContent.href;
	var description = entry.content.$t;
    timelinerEntries.push(new Timeline.DefaultEventSource.Event(
      start,
      null, // end - when not set, event displayed with icon (looks better)
      null, // latestStart
      null, // latestEnd
      false, // not isDuration
      title,
      description,
      null, // link - destination when clicking on title
      icon,
      undefined, // color
      undefined  // textColor
    ));
  }
  gEventSource.addMany(timelinerEntries);
};

/* additional Date conversion functions are available from Google, check the resources
[1] http://code.google.com/apis/calendar/reference.html#Parameters
[2] http://code.google.com/apis/gdata/samples.html#JSON
*/
function convertFromGDataDate(/*string<YYYY-MM-DD>*/ date) {
  var match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
  return new Date(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10));
}