//setting functionality to a specifc page
// import config from './../..config.js'
// console.log(config)
var myKey = password.GOOGLE_API_KEY

//connecting to firebase to get data that was entered on syrup page
var config = {
	apiKey: "AIzaSyCFaXvnaHL3JsKa8rsUtkAxFiUJBsPm9bQ",
	authDomain: "stfirebase-66923.firebaseapp.com",
	databaseURL: "https://stfirebase-66923.firebaseio.com",
	projectId: "stfirebase-66923",
	storageBucket: "stfirebase-66923.appspot.com",
	messagingSenderId: "367723280740"
};
firebase.initializeApp(config);

var database = firebase.database();

//initializing syrup variables 
var syrupDiv;
var cherry;
var vanilla;
var coconut;
var peach;

let x
let y
function initMap(x, y) {
	// The location of Uluru
	var uluru = { lat: x, lng: y };
	// The map, centered at Uluru
	var map = new google.maps.Map(
		document.getElementById('map'), { zoom: 4, center: uluru });
	// The marker, positioned at Uluru
	var marker = new google.maps.Marker({ position: uluru, map: map });
}

$(document).ready(function () {


	navigator.geolocation.getCurrentPosition(function (position) {
		// var gps = (position.coords.latitude + "," + position.coords.longitude);
		// window.gps = gps;

		x = position.coords.latitude;
		y = position.coords.longitude

<<<<<<< HEAD
		continueSomeProcess()
	});
	//creating callback function  so my geolocation loads before any of my javascipt runs.
	function continueSomeProcess() {
		console.log(x)
		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&radius=2000&types=convenience_store&limit=5&key=AIzaSyAiF9BD-SMgaRYtpi0vIEzyj_6vhO0t83o"
=======
		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&radius=2000&types=convenience_store&limit=5&key=" + myKey;
>>>>>>> master

		$.ajax({
			url: gasStationURL,
			method: "GET"
		})
			.then(function (response) {
				$('.loading-gif-wrapper').hide()
				console.log(response);
				for (var i = 0; i < 5; i++) {
					var list = $("<li>");
					list.addClass("list-group-item")
					list.html(response.results[i].name + "<br>" + response.results[i].vicinity + ", Utah <br>"+ "Cherry: " + cherry + "<br>" + "Vanilla: " + vanilla + "<br>" + "Coconut: " + coconut +" <br>" + "Peach: " + peach)

					$(".gas-station-list").append(list);
				}
				initMap(x, y)
			})


	}
	//grabs data from firebase and re
	function getSyrups() {
		database.ref().on("child_added", function (childSnapshot) {
			console.log(childSnapshot);
			cherry = childSnapshot.val().cherry;
			vanilla = childSnapshot.val().vanilla;
			coconut = childSnapshot.val().coconut;
			peach = childSnapshot.val().peach;


			//  syrupDiv = $("<div>").addClass("syrup-data").append(
			// 	$("<div>").addClass("table-data col-lg-2").text(cherry),
			// 	$("<div>").addClass("table-data col-lg-2").text(vanilla),
			// 	$("<div>").addClass("table-data col-lg-2").text(coconut),
			// 	$("<div>").addClass("table-data col-lg-2").text(peach),
			// )

				// $(".list-group-item").append(syrupDiv);
		})
	}
	getSyrups()
});


// $(".carousel").carousel({
// 	interval: 2000
// })

//setting up Firebase for syrups