//setting functionality to a specifc page
// import config from './../..config.js'
// console.log(config)
var myKey = "AIzaSyD1OUTs9dglCHpQLJf6UOJWECwTMC4W-lY";

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
var gasStationIds = [];

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
		y = position.coords.longitude;
		
		continueSomeProcess()
	});
	//creating callback function  so my geolocation loads before any of my javascipt runs.
	function continueSomeProcess() {
		console.log(x)
	
		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&radius=2000&types=convenience_store&limit=5&key=" + myKey;

		$.ajax({
			url: gasStationURL,
			method: "GET"
		})
			.then(function (response) {
				$('.loading-gif-wrapper').hide()
				console.log(response);
				for (var i = 0; i < 5; i++) {
					gasStationIds.push(response.results[i].id);
					var list = $("<li>");
					list.addClass("list-group-item")
					list.html(response.results[i].name + "<br>" + response.results[i].vicinity)
					let syrupDiv = $('<div>')
					syrupDiv.attr('id', response.results[i].id)
					var editButton = $("<a>");
					let pathname = window.location.origin.indexOf('file') > -1 ? "/C:/Users/Owner/uubc/group%20projects/RRC/TeamProjectRRC/sodaForm.html" : "/sodaForm.html"
					editButton.attr("href", window.location.origin + pathname + "?id=" + response.results[i].id)
					editButton.text("Update Syrups");
					list.append(syrupDiv, editButton)
					$(".gas-station-list").append(list);
				}
				initMap(x, y)
				getSyrups()
			})


	}
	//grabs data from firebase and re
	function getSyrups() {
		for(let i=0; gasStationIds.length; i++){
			database.ref().orderByChild("location").equalTo(gasStationIds[i]).once("value").then(function (snapshot) {
				let fbObj = {}
				if(snapshot.val()){
					console.log(snapshot)
					fbObj = snapshot.val()[Object.keys(snapshot.val())[0]]
					console.log(fbObj)
					let syrupDiv = document.getElementById(fbObj.location)
					syrupDiv.innerHTML = "Cherry: " + fbObj.cherry + "<br>" + "Vanilla: " + fbObj.vanilla + "<br>" + "Coconut: " + fbObj.coconut +" <br>" + "Peach: " + fbObj.peach
					//update the DOM
				} else {
					database.ref().push({
						location: gasStationIds[i],
						cherry: "No Data",
						vanilla: "No Data",
						coconut: "No Data",
						peach: "No Data",
						dateAdded: firebase.database.ServerValue.TIMESTAMP
					}).then(function(res){
						getStragglerSyrup(gasStationIds[i])
						console.log(res)
					});
				}
			})
		}
	}

	function getStragglerSyrup(id){
		database.ref().orderByChild("location").equalTo(id).once("value").then(function (snapshot) {
			let fbObj = {}
			if(snapshot.val()){
				fbObj = snapshot.val()[Object.keys(snapshot.val())[0]]
				let syrupDiv = document.getElementById(fbObj.location)
				syrupDiv.innerHTML = "Cherry: " + fbObj.cherry + "<br>" + "Vanilla: " + fbObj.vanilla + "<br>" + "Coconut: " + fbObj.coconut +" <br>" + "Peach: " + fbObj.peach
			}
		})	
	}

	getSyrups()
});


// $(".carousel").carousel({
// 	interval: 2000
// })

//setting up Firebase for syrups