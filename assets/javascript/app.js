//API code for google place api:AIzaSyAiF9BD-SMgaRYtpi0vIEzyj_6vhO0t83o//




$(document).on("click", "button", function () {
	var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=gas_station&key=AIzaSyAiF9BD-SMgaRYtpi0vIEzyj_6vhO0t83o"


	$.ajax({
		url: gasStationURL,
		method: "GET"
	})
		.then(function (response) {
			console.log(response);
		})
})