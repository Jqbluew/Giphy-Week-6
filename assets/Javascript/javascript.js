
/*
SAMPLE http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true
JP's =https://api.giphy.com/v1/gifs/random?api_key=XACr6gSTTFqwmlD2UBnIscDISgHS9EA9

https://api.giphy.com/v1/

API Key XACr6gSTTFqwmlD2UBnIscDISgHS9EA9

javascript, jQuery =var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");*/

$(document).ready(function() {
	var frenchGifs =['Cheese', 'Wine', 'Bread', 'Escargot', 'Eiffel Tower', 'Croissant', 'Fashion'];

	function displayGifButtons(){
		for (var i = 0; i < frenchGifs.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("frenchGifs");
			gifButton.addClass("btn btn-primary")
			gifButton.attr("data-name", frenchGifs[i]);
			gifButton.text(frenchGifs[i]);
			$("#gifShowcase").append(gifButton);
		}
	}	

function addNewButton(){
	$("#addGif").on("click", function(){
		var addGiphy = $("#add-giphy").val().trim();
		alert ("HELLO");
		if (addGiphy == ""){
			return false;
		}
		frenchGifs.push(addGiphy);
		displayGifButtons();
		return false;
	});
}

function removeLastButton(){
	$("removeGif").on("click", function(){
		addGiphy.pop(frenchGifs);
		displayGifButtons();
		return false;
	});
}

function displayGifs(){
	var addGiphy = $(this).attr("data-name");
	var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=XACr6gSTTFqwmlD2UBnIscDISgHS9EA9&q=" + addGiphy+ "&limit=20&offset=0&rating=G&lang=en";

	//"https://api.giphy.com/v1/gifs/" +addGiphy+ "?api_key=XACr6gSTTFqwmlD2UBnIscDISgHS9EA9";

	//"http://api.giphy.com/v1/gifs/search?" +addGiphy+ "&api_key=XACr6gSTTFqwmlD2UBnIscDISgHS9EA9";

	//"https://api.giphy.com/v1/gifs/search?q=" + addGiphy + "&api_key=XACr6gSTTFqwmlD2UBnIscDISgHS9EA9&limit=10";
 	console.log(queryURL);
  $.ajax({
        url: queryURL,
        method: 'GET'
    })
  .done(function(respone) {
  	$("#gifDisplay").empty();
  	var newGif = respone.data;
  	if (newGif == ""){
  		alert("Please try again.");
  	}
	  	for (var i = 0; i < newGif.length; i++) {
	  		
	  		var gifDiv = $("<div>");
	  		gifDiv.addClass("gifDiv");	            
	        var gifImage = $("<img>");
	        gifImage.attr("src", newGif[i].images.fixed_height_small_still.url); 
	        gifImage.attr("data-still",newGif[i].images.fixed_height_small_still.url); 
	        gifImage.attr("data-animate",newGif[i].images.fixed_height_small.url); 
	        gifImage.attr("data-state", "still"); 
	        gifImage.addClass("image");
	        gifDiv.append(gifImage);

	        $("#gifsView").prepend(gifDiv);
		}
	});
}

	displayGifButtons();
	addNewButton();
	removeLastButton();

		//$("#button").click(function)
		$(document).on("click", "addGiphy", displayGifs);
		$("gifShowcase").on("click", "frenchGifs", function(){
			alert("OK")
		});
		$(document).on("click", "gifDiv", function(){
		
		var imgState = $(this).attr('data-state');
		if (imgState == 'still'){
		    $(this).attr('src', $(this).data('animate'));
		    $(this).attr('data-state', 'animate');
		    }else{
		    $(this).attr('src', $(this).data('still'));
		    $(this).attr('data-state', 'still');
		}
	});	
});