$(document).ready(function() {

  var keyId = "";
  var messageSpaceKeys = [];

  $(".closeModal1").click(function(){
	   $("#joinModal").fadeToggle("fast", "linear");
     $("#id-key").val("");
  });

  $(".closeModal2").click(function(){
	   $("#createModal").fadeToggle("fast", "linear");
     $("#channelName").val("");
     keyId = "";
  });

   $("#join-channel").click(function(){
 	   $("#joinModal").fadeToggle("fast", "linear");
     $("#id-key").val("");
     $.getJSON("/api/all", function(data) {
       for (var i = 0; i < data.length; i++) {
         messageSpaceKeys.push(data[i].key);
         console.log(data[i].key);
       }
     });
   });

   $("#create-channel").click(function(){
     $("#createModal").fadeToggle("fast", "linear");
     $("#channelName").val("");
     makeid();
     console.log(keyId);
   });

   $("#submit-join").click(function(){
     event.preventDefault();
     if (messageSpaceKeys.includes($("#id-key").val())) {
       window.location.href = "/messagespace/" + $("#id-key").val();
     }
     else {
       window.location.href = "/error";
     }
     $("#id-key").val("");
     messageSpaceKeys = [];
   });

   function makeid() {
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     for (var i = 0; i < 5; i++) {
        keyId += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    }

   $("#submit-create").click(function(){
     //event.preventDefault();
     var public;
     if ($("#publicPrivate").is(":checked"))
      public = true;
     else
      public = false;
     $.ajax({
				type: "POST",
				dataType: 'json',
				url: '/api/messageSpaces',
				data: {
					name: $("#channelName").val(),
          key: keyId,
          public: public,
          messages: [""]
				},
				success: function (output) {
					console.log(output);
				},
				error: function (request, status, error) {
					alert(request.responseText);
				}
			}).done(function(data) {
        console.log("it is done");
        keyId = "";
        /// should be getJSON to this new channel
      });
    });
   //$("#id-key")
});
