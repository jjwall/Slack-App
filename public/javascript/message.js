$(document).ready(function() {

  $("#messageEnvironment").hide();

  var configFb = config;

  firebase.initializeApp(configFb);

  var database = firebase.database();

  var messageRef = database.ref("messages");
  //messages will be equivalent to channell reference i.e. b4LqRz

  var globalName;

  //messageRef.onDisconnect().remove();

  $("#submit-name").on("click", function(){
    if ($("#user-name").val() === "")
      alert("Please Enter a Name!");
    else {
      //hide this, show the rest of the stuff
      globalName = $("#user-name").val();
      console.log(globalName);
      $("#nameEnter").hide();
      $("#messageEnvironment").show();
    }
  });

  $("#messageInput").keyup(function(event){
    if(event.keyCode == 13){
        submitThatIsh();
    }
  });

  $("#submit-message").on("click", submitThatIsh());

  function submitThatIsh() {
    if ($("#messageInput").val() === "")
      alert("You must enter a message to submit a message!");
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
  //messageRef.onDisconnect().remove();
});

});
