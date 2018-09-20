$(".carousel").carousel({
	interval:2000
});

// var myKey = password.GOOGLE_API_KEY

let x 
let y
function initMap(x, y) {
	// The location of Uluru
	var uluru = {lat: x, lng: y};
	// The map, centered at Uluru
	var map = new google.maps.Map(
		document.getElementById('map'), {zoom: 4, center: uluru});
		// The marker, positioned at Uluru
		var marker = new google.maps.Marker({position: uluru, map: map});
}

$(document).ready(function () {


navigator.geolocation.getCurrentPosition(function (position) {
	// var gps = (position.coords.latitude + "," + position.coords.longitude);
	// window.gps = gps;

	x = position.coords.latitude;
	y = position.coords.longitude

	continueSomeProcess()
});
//creating callback function  so my geolocation loads before any of my javascipt runs.
function continueSomeProcess() {

	console.log(x)



		var myKey = "AIzaSyD1OUTs9dglCHpQLJf6UOJWECwTMC4W-lY";

		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&radius=2000&types=convenience_store&limit=5&key=" + myKey;




		$.ajax({
			url: gasStationURL,
			method: "GET"
		})
			.then(function (response) {
				// $('.loading-gif-wrapper').hide()
				console.log(response);
				for (var i = 0; i < 5; i++) {
					var list = $("<li>");
					list.addClass("list-group-item")
					list.html(response.results[i].name + "<br>" + response.results[i].vicinity + ", Utah <br>")

					$(".gas-station-list").append(list);					
				}
				initMap(x, y)
			})


	






}
});
