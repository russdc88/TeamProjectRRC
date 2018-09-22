//API Key
var myKey = "AIzaSyD1OUTs9dglCHpQLJf6UOJWECwTMC4W-lY"

//doesn't allow  nested logic run until document is ready
$(document).ready(function () {

	//setting functionality to a specifc page
	// import config from './../..config.js'
	// console.log(config)


	// preparing config for connection to firebase
	var config = {
		apiKey: "AIzaSyCFaXvnaHL3JsKa8rsUtkAxFiUJBsPm9bQ",
		authDomain: "stfirebase-66923.firebaseapp.com",
		databaseURL: "https://stfirebase-66923.firebaseio.com",
		projectId: "stfirebase-66923",
		storageBucket: "stfirebase-66923.appspot.com",
		messagingSenderId: "367723280740"
	};
	//connecting to firebase to get data that was entered on syrup page
	firebase.initializeApp(config);

	//creating a reference to firebase database
	var database = firebase.database();

	//div to hold syrup list for each location
	var syrupDiv;

	//variables for syrup flavors
	var cherry;
	var vanilla;
	var coconut;
	var peach;

	//will hold gas station ids for each of the 5 locations- provided by google api
	var gasStationIds = [];

	//lattitude and longitude variables for google api
	let x;
	let y;

	//initializes google maps
	function initMap(x, y) {
		// The location of my geolocation
		var uluru = { lat: x, lng: y };
		// The map, centered at my location
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: uluru
		});
		// The marker, positioned at my location
		var marker = new google.maps.Marker({ position: uluru, map: map });
	}




	//lets google locate user to be used to grab gas stations within 5000 meters of user location
	navigator.geolocation.getCurrentPosition(function (position) {
		// var gps = (position.coords.latitude + "," + position.coords.longitude);
		// window.gps = gps;

		x = position.coords.latitude;
		y = position.coords.longitude;

		continueSomeProcess()
	});

	//creating callback function so my geolocation loads before any of my javascipt runs.
	function continueSomeProcess() {
		console.log(x)

		//creating api to pull gas stations locations near current locations

		var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + x + "," + y + "&rankby=distance&keyword=gas&types=convenience_store&limit=5&key=" + myKey;

		$.ajax({
			url: gasStationURL,
			method: "GET"
		})
			.then(function (response) {
				$('.loading-gif-wrapper').hide()
				console.log(response);

				//only displays first 5 results
				for (var i = 0; i < 5; i++) {
					gasStationIds.push(response.results[i].id);
					var list = $("<li>");
					list.addClass("list-group-item")

					//grabs gas station name and address from google api and displays them in a list on gasStationList.html dom
					list.html(response.results[i].name + "<br>" + response.results[i].vicinity + " UT")

					//place holder div for syrup data from firebase
					let syrupDiv = $('<div>')

					//key line- setting syrupDiv id = id from google api for each location in list
					syrupDiv.attr('id', response.results[i].id)

					//creating an link to sodaform.html below each gas station syrup list that links to the individual data for each location using location id
					var editButton = $("<a>");

					//checks if url path exists- "file" is just a placeholder, then if it exits it assigns the location in C drive to pathname 
					let pathname = ""
					if (window.location.href.indexOf("file") > -1) {
						pathname = window.location.href.split('file://')[1].split("gasStationList.html")[0] + "sodaForm.html"
					} else {
						pathname = "/sodaForm.html"
					}
					console.log(pathname)

					// let pathname = window.location.origin.indexOf('file') > -1 ? "/C:/Users/Owner/uubc/group%20projects/RRC/TeamProjectRRC/sodaForm.html" : "/sodaForm.html"

					//setting the href with dynamic url path name variables + the unique id of each location which was provided by google api
					editButton.attr("href", window.location.origin + "/TeamProjectRRC" + pathname + "?id=" + response.results[i].id)
					editButton.text("Update Syrups");
					list.append(syrupDiv, editButton)
					$(".gas-station-list").append(list);
				}
				initMap(x, y)
				getSyrups()
			})


	}
	//grabs data from firebase and displays them below each gas station that is listed on gas station page
	function getSyrups() {
		//iterates for length of gasStationsId array- hold 5 ids
		for (let i = 0; gasStationIds.length; i++) {

			//key line- retreiving object from firebase that contains id that is linked to <a href> link with unique location id 
			database.ref().orderByChild("location").equalTo(gasStationIds[i]).once("value").then(function (snapshot) {

				//creating an empty object
				let fbObj = {}

				//if snapshot.val() has a value(id number), grab data from firebase and put in syrup div on gasStatioList.html
				if (snapshot.val()) {
					console.log("Snapshot" + JSON.stringify(snapshot))

					//grabbing value of the keys at index 0 in snapshot(only one object in snapshot per iteration)
					fbObj = snapshot.val()[Object.keys(snapshot.val())[0]]
					console.log(fbObj)
					let syrupDiv = document.getElementById(fbObj.location)
					syrupDiv.innerHTML = "Cherry: " + fbObj.cherry + "<br>" + "Vanilla: " + fbObj.vanilla + "<br>" + "Coconut: " + fbObj.coconut + " <br>" + "Peach: " + fbObj.peach
					//update the DOM

					//if snapshot.val() for that id doesn't exist- push "no data" into firebase for each flavor
				} else {
					database.ref().push({
						location: gasStationIds[i],
						cherry: "No Data",
						vanilla: "No Data",
						coconut: "No Data",
						peach: "No Data",
						dateAdded: firebase.database.ServerValue.TIMESTAMP

						//then, pull the new "no data" inputs from firebase and display in syrupDiv on gasStationList.html- now all gas stations have syrup data on html dom
					}).then(function (res) {
						getStragglerSyrup(gasStationIds[i])
						console.log(res)
					});
				}
			})
		}
	}

	//calling firebase to get all items with an id to populate gas station syrup lists that just got "no data" pushed into values of flavor keys
	function getStragglerSyrup(id) {

		//looking through database for objects that contain a key of "location" with a value(id), then sending a snapshot of the data back to user
		database.ref().orderByChild("location").equalTo(id).once("value").then(function (snapshot) {

			//creating an empty object
			let fbObj = {}

			//if snapshot.val() has a value
			if (snapshot.val()) {

				//grabbing value of the keys at index 0 in snapshot(only one object in snapshot per iteration)
				fbObj = snapshot.val()[Object.keys(snapshot.val())[0]]
				let syrupDiv = document.getElementById(fbObj.location)
				syrupDiv.innerHTML = "Cherry: " + fbObj.cherry + "<br>" + "Vanilla: " + fbObj.vanilla + "<br>" + "Coconut: " + fbObj.coconut + " <br>" + "Peach: " + fbObj.peach
			}
		})
	}

	getSyrups()
});


// $(".carousel").carousel({
// 	interval: 2000
// })

//setting up Firebase for syrups