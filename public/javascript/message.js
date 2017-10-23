$(document).ready(function() {

  $("#messageEnvironment").hide();

  var configFb = config;

  firebase.initializeApp(configFb);

  var database = firebase.database();

  var messageRef = database.ref(window.location.href);

  var key;

  if (window.location.href.substring(7,8) === "l") {
    key = window.location.href.substring(35,40);
    console.log(key);
  }
  else if (window.location.href.substring(7,8) === "j") {
    key = window.location.href.substring(46,51);
  }
  // ^ all this is to get key from window.location.href b/c we'll need it to update mongo will messages

  var globalName;

  $("#recentMessages").empty();

  $("#recentMessages").prepend('<em>Welcome to the message space!</em>');

  //messageRef.onDisconnect().remove();

  $("#submit-name").on("click", function(event){
    event.preventDefault();
    submitName();
  });

  function submitName() {
    if ($("#user-name").val() === "")
      alert("Please Enter a Name!");
    else {
      //hide this, show the rest of the stuff
      globalName = $("#user-name").val();
      console.log(globalName);
      $("#nameEnter").hide();
      $("#messageEnvironment").show();
    }
  }

  $("#user-name").keyup(function(event){
    if(event.keyCode == 13){
        submitName();
    }
  });

  $("#messageInput").keyup(function(event){
    if(event.keyCode == 13){
        submitInput();
    }
  });

  $("#submit-message").on("click", function(event){
    event.preventDefault();
    submitInput();
  });

  function submitInput() {
    if ($("#messageInput").val() === ""){
       // alert("You must enter a message to submit a message!");
    }
    else {
      messageRef.set({
        message: `${globalName}: ${$("#messageInput").val()}`
      });
      $("#messageInput").val("");
      $("#recentMessages").animate({scrollTop: 0});
    }
  }

  messageRef.on("value", function(snapshot) {
    $("#recentMessages").prepend(`<p>${snapshot.val().message}</p>`);
    console.log(snapshot.val().message);
    $.ajax({
        url: `/api/messageSpaces/${key}`,
        type: 'PUT',
        dataType: 'json',
        data: snapshot.val().message
    });
    //messageRef.onDisconnect().remove();
    //$.ajax({})
  });

});
