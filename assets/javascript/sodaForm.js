  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAu7V-H1lwTNT7OLJ3-5gmQhqDulenZZXo",
    authDomain: "teamprojectrrc.firebaseapp.com",
    databaseURL: "https://teamprojectrrc.firebaseio.com",
    projectId: "teamprojectrrc",
    storageBucket: "teamprojectrrc.appspot.com",
    messagingSenderId: "850694117642"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var cherry = "";
  var vanilla = ""; 
  var coconut = "";
  var peach = "";
  
  $(".submit").on("click", function (event) {
      event.preventDefault();
      console.log("I'm working");

      
      //adding variables
      cherry = $("#cherry-input").val();
      vanilla = $("#vanilla-input").val();
      coconut = $("#coconut-input").val();
      peach = $("#peach-input").val();

      console.log(cherry);
      console.log(vanilla);
      console.log(coconut);
      console.log(peach);

      database.ref().set({
          cherry: cherry,
          vanilla: vanilla,
          coconut: coconut,
          peach: peach,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      
  });

