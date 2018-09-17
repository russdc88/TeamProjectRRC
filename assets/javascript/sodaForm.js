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

var database = firebase.database();

var location = "c";
var cherry = "";
var vanilla = "";
var coconut = "";
var peach = "";

//calling geo locator like gasStationList.js but using to populate select element class gas-station-input with gas station locations in option elements
// let x
// let y
// function initMap(latX, lonY) {
//     // The location of Uluru
//     var uluru = { lat: latX, lng: lonY };
//     // The map, centered at Uluru
//     var map = new google.maps.Map(
//         document.getElementById('map'), { zoom: 4, center: uluru });
//     // The marker, positioned at Uluru
//     var marker = new google.maps.Marker({ position: uluru, map: map });
// }

// $(document).ready(function() {


//     navigator.geolocation.getCurrentPosition(function (position) {
//         // var gps = (position.coords.latitude + "," + position.coords.longitude);
//         // window.gps = gps;

//         latX = position.coords.latitude;
//         lonY = position.coords.longitude

//         continueSomeProcess()
//     });
// });

//     //creating callback function  so my geolocation loads before any of my javascipt runs.
//     function continueSomeProcess() {
//         console.log(latX)
//         var gasStationURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latX + "," + lonY + "&radius=2000&types=convenience_store&limit=5&key=AIzaSyAiF9BD-SMgaRYtpi0vIEzyj_6vhO0t83o"

//         $.ajax({
//             url: gasStationURL,
//             method: "GET"
//         })
//             .then(function (response) {
//                 $('.loading-gif-wrapper').hide()
//                 console.log(response);
//                 for (var i = 0; i < 5; i++) {
//                     var list = $("<li>");
//                     list.addClass("list-group-item")
//                     list.html(response.results[i].name + "<br>" + response.results[i].vicinity + ", Utah <br>" + "Cherry: " + cherry + "<br>" + "Vanilla: " + vanilla + "<br>" + "Coconut: " + coconut + " <br>" + "Peach: " + peach)

//                     $(".gas-station-list").append(list);
//                 }
//                 initMap(latX, lonY)
//             })
//     }
// var gasStationOption= $("<option>").addClass("gas-station-option").text("location");
// $("#gas-station-input").append(gasStationOption);



    $(".submit").on("click", function (event) {
        event.preventDefault();
        console.log("I'm working");


        //adding variables
        // location = $(".gas-station-option").val();
        cherry = $("#cherry-input").val();
        vanilla = $("#vanilla-input").val();
        coconut = $("#coconut-input").val();
        peach = $("#peach-input").val();
        
        // console.log(location);
        console.log(cherry);
        console.log(vanilla);
        console.log(coconut);
        console.log(peach);

        database.ref().push({
            // location: location,
            cherry: cherry,
            vanilla: vanilla,
            coconut: coconut,
            peach: peach,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

