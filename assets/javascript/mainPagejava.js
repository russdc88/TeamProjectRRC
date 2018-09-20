//Carousel time switch on main page
$(".carousel").carousel({
	interval: 2000
});

//API key
var myKey = "AIzaSyD1OUTs9dglCHpQLJf6UOJWECwTMC4W-lY"

let x
let y
function initMap(x, y) {
	// creating my geolocation
	var uluru = { lat: x, lng: y };
	// The map, centered at my location
	var map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: 15,
			center: uluru
		});
	// The marker, positioned at my location
	var marker = new google.maps.Marker({ position: uluru, map: map });
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

		//creating api to pull gas stations locations near current locations

		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&rankby=distance&keyword=gas&types=convenience_store&limit=5&key=" + myKey;

		$.ajax({
			url: gasStationURL,
			method: "GET"
		})
			.then(function (response) {
				//hide loading gif 
				$('.loading-gif-wrapper').hide()
				console.log(response);

				//load 5 locations with their name and address
				for (var i = 0; i < 5; i++) {
					var list = $("<li>");
					list.addClass("list-group-item")
					list.html(response.results[i].name + "<br>" + response.results[i].vicinity + ", UT <br>")

					$(".gas-station-list").append(list);
				}
				initMap(x, y)
			})









	}
});
