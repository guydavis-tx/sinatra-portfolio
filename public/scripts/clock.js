// Get the time of day and convert to HEX
function getHexTime() {
	var d = new Date(); // for now
	
	// get the hours, minutes, seconds as a string
	var txtHours = ''+d.getHours();
	var txtMins = ''+d.getMinutes();
	var txtSecs = ''+d.getSeconds();

	// check of value is single digit -- if yes pad with leading zero
	if (txtHours.length==1) {txtHours = '0'+txtHours;}
	if (txtMins.length==1) {txtMins = '0'+txtMins;}
	if (txtSecs.length==1) {txtSecs = '0'+txtSecs;}

	console.log(txtHours);
	console.log(txtMins);
	console.log(txtSecs);

	// create HEX version
	var time = "#"+txtHours+txtMins+txtSecs;
	console.log(time);
	return time;
}
//***********************************************************
// put all js function calls in JQ document ready so they
// don't execute before full page load
//***********************************************************
$(document).ready(function(){

	// Update screen every second with new hextime and background color
	var hexTime;
	setInterval(function(){
		hexTime = getHexTime();
		// Update text on screen with HEX value
		$('#hex-text').text(hexTime);
		console.log("from Doc Ready: "+hexTime);

		// Set body background color to hex value
		$('body').css('background-color', hexTime);

	},1000);

})  // end of document ready