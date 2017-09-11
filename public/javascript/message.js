$(document).ready(function() {

  var configFb = config;

  firebase.initializeApp(configFb);

  var dataRef = firebase.database();

  var globalName;

  $("#submit-name").on("click", function(){
    if ($("#user-name").val() === "")
      alert("Please Enter a Name!");
    else {
      //hide this, show the rest of the stuff
      globalName = $("#user-name").val();
      console.log(globalName);
    }
  })

});
