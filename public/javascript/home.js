$(document).ready(function() {

  var keyId = "";

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
   });

   $("#create-channel").click(function(){
     $("#createModal").fadeToggle("fast", "linear");
     $("#channelName").val("");
     makeid();
     console.log(keyId);
   });

   $("#submit-join").click(function(){
     event.preventDefault();
	 	 window.location.href = "/" + $("#id-key").val();
     $("#id-key").val("");
   });

   function makeid() {
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     for (var i = 0; i < 5; i++) {
        keyId += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    }

   $("#submit-create").click(function(){
     //event.preventDefault();
     $.ajax({
				type: "POST",
				dataType: 'json',
				url: '/api/messageSpaces',
				data: {
					name: $("#channelName").val(),
          key: keyId,
          messages: []
				},
				success: function (output) {
					console.log(output);
				},
				error: function (request, status, error) {
					alert(request.responseText);
				}
			}).done(function(data) {
        console.log("it is done");
        keyId = ""
        /// should be getJSON to this new channel
      });
    });
   //$("#id-key")
});
