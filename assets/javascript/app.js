//setting functionality to a specifc page




navigator.geolocation.getCurrentPosition(function (position) {
	// var gps = (position.coords.latitude + "," + position.coords.longitude);
	// window.gps = gps;

	var x = position.coords.latitude;
	var y = position.coords.longitude
	window.x = x;
	window.y = y;

	continueSomeProcess()
});
//creating callback function  so my geolocation loads before any of my javascipt runs.
function continueSomeProcess() {

	console.log(x)


	$(document).ready(function () {


		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&radius=2000&types=convenience_store&limit=5&key=AIzaSyAiF9BD-SMgaRYtpi0vIEzyj_6vhO0t83o"




		$.ajax({
			url: gasStationURL,
			method: "GET"
		})
			.then(function (response) {
				console.log(response);
				for (var i = 0; i < 5; i++) {
					var list = $("<li>");
					list.addClass("list-group-item")
					list.html(response.results[i].name + "<br>" + response.results[i].vicinity + ", Utah <br>")

					$(".gas-station-list").append(list);
					function initMap() {
						// My location
						var uluru = { lat: x, lng: y };
						// The map, centered at Uluru
						var map = new google.maps.Map(
							document.getElementById('map'), { zoom: 4, center: uluru });
						// The marker, positioned at Uluru
						var marker = new google.maps.Marker({ position: uluru, map: map });
					}
					initMap()
				}

			})
	

	});






}

// $(".carousel").carousel({
// 	interval: 2000
// })

//setting up Firebase for syrups