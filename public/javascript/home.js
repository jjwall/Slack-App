$(document).ready(function() {

  $(".closeModal").click(function(){
	   $("#joinModal").fadeToggle("fast", "linear");
     $("#id-key").val("");
  });

   $("#join-channel").click(function(){
 	   $("#joinModal").fadeToggle("fast", "linear");
     $("#id-key").val("");
   });

   $("#submit-join").click(function(){
     event.preventDefault();
	 	 window.location.href = "/" + $("#id-key").val();
     $("#id-key").val("");
   })
   //$("#id-key")
});
