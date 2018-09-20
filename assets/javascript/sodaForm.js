//doesn't allow javascript to run until document is ready
$(document).ready(function () {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCFaXvnaHL3JsKa8rsUtkAxFiUJBsPm9bQ",
		authDomain: "stfirebase-66923.firebaseapp.com",
		databaseURL: "https://stfirebase-66923.firebaseio.com",
		projectId: "stfirebase-66923",
		storageBucket: "stfirebase-66923.appspot.com",
		messagingSenderId: "367723280740"
	};
	firebase.initializeApp(config);

	//naming firebase database
	var database = firebase.database();
	var myKey = "AIzaSyD1OUTs9dglCHpQLJf6UOJWECwTMC4W-lY";
	var location = "358d94c69bf1ecc3cb5dd8e29a77a93d1047cb84";
	var cherry = "";
	var vanilla = "";
	var coconut = "";
	var peach = "";

	//will hold gas station ids for each of the 5 locations- provided by google api
	var gasStationIds = [];

	//calling geo locator like gasStationList.js but using to populate <select> with class= "gas-station-input" with gas station locations in <option>
	let x
	let y
	function initMap(latX, lonY) {
		//The location of Uluru
		var uluru = { lat: latX, lng: lonY };
		// The map, centered at Uluru
		var map = new google.maps.Map(
			document.getElementById('map'), { zoom: 4, center: uluru });
		// The marker, positioned at Uluru
		var marker = new google.maps.Marker({ position: uluru, map: map });
	}

	// $(document).ready(function () {
	//univeral start code for calling url information 
	let params = (new URL(document.location)).searchParams;

	//grabbing data from firebase for objects that contain the key/value pair "location":id
	function getSyrupData() {

		//calling firebase to return a snapshot of all objects that have the key/value pair "location":id
		database.ref().orderByChild("location").equalTo(params.get('id')).once("value").then(function (snapshot) {

			//creating an empty object
			let fbObj = {}

			//if snapshot.val() has a value...
			if (snapshot.val()) {

				//grabbing value of the keys at index 0 in snapshot(only one object in snapshot per id) and putting into fbObj
				fbObj = snapshot.val()[Object.keys(snapshot.val())[0]]
				console.log(fbObj)
				document.getElementById("cherry-input").options[0].innerHTML = fbObj.cherry
				document.getElementById("vanilla-input").options[0].innerHTML = fbObj.vanilla
				document.getElementById("coconut-input").options[0].innerHTML = fbObj.coconut
				document.getElementById("peach-input").options[0].innerHTML = fbObj.peach
			}
		})
	}
	getSyrupData()

	// var gasStationOption = $("<option>").addClass("gas-station-option").text("location");
	// $("#gas-station-input").append(gasStationOption);

	$('.syrup-select').on("change", function () {
		this.options[0].innerHTML = this.value
	})

	//when submit button is clicked...
	$(".submit").on("click", function (event) {

		var id = window.location.search.split("?")[1].split("=")[1]
		event.preventDefault();
		console.log("I'm working");

		//get inputs of syrup

		database.ref().orderByChild("location").equalTo(id).once("value").then(function (snapshot) {
			let key = Object.keys(snapshot.val())[0]
			console.log(document.getElementById("cherry-input"));
			database.ref(key).update({
				cherry: document.getElementById("cherry-input").options[0].innerHTML,
				vanilla: document.getElementById("vanilla-input").options[0].innerHTML,
				coconut: document.getElementById("coconut-input").options[0].innerHTML,
				peach: document.getElementById("peach-input").options[0].innerHTML
			}, function () {
				console.log('window.location', window.location);
				console.log('window.location.origin', window.location.origin);
				console.log('window.location.pathname', window.location.pathname);
				let searchString = /\w+\.html/gi;
				let result = window.location.pathname.match(searchString);
				window.location = window.location.origin + window.location.pathname.replace(result, 'gasStationList.html');
				console.log('result', result);
				// window.location=window.location.origin;
			})
		});
	})
})
