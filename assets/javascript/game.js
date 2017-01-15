var searchTerm;
var termList = ["surprised", "happy", "angry", "sad", "excited", "sleepy", "hug", "agree", "disagree", "approve", "wink", "thumbs up", "dance", "cry", "sigh", "shock"];
var gifLimit = 100; //max is 100!
var returnedNumGifs = 10;
var gifChosen = [];
var giphyURL;
var gifAnimateOn;
var gifAnimateOff;
var gifState;



function populateButtons(){

	$("#buttonSpot").empty();
	for (var i = 0; i < termList.length; i++) {
		console.log(termList[i]);
		$("#buttonSpot").append("<button type='button' class='gifButton top5 right5 btn btn-primary'>" + termList[i] + "</button>");
	};
};

function randomGifs() {
	gifChosen = [];
	for (var i = 0; i < returnedNumGifs; i++) {
		var gifNumber = Math.floor(Math.random() * gifLimit);
			if (gifChosen.indexOf(gifNumber) === -1) {
				gifChosen.push(gifNumber);	
			}
	};
};

populateButtons();


function populateGifs(){
	$.ajax({
	    url: "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + gifLimit + "&api_key=dc6zaTOxFJmzC",
	    method: 'GET',
	    context: document.body
	})
	.done(function(response) {
		console.log(response);

		randomGifs();
		console.log(gifChosen);

		for (var i = 0; i < gifChosen.length; i++) {
			giphyURL = response.data[gifChosen[i]].images.downsized_still.url;
			var dataStill = response.data[gifChosen[i]].images.downsized_still.url;
			var dataAnimate = response.data[gifChosen[i]].images.downsized.url;
			var dataRating = response.data[gifChosen[i]].rating;
			dataRating = dataRating.toUpperCase();
			var gifState = "animateOff";
			var imgSource = "'" + giphyURL + "' data-still = '" + dataStill + "' data-animate = '" + dataAnimate + "' data-state = '" + gifState + "'";
			$("#gifSpot").prepend("<div class='gifDiv'><img src=" + imgSource + "><p><strong>Rating: </strong>" + dataRating + "</p></div>");
		};		
	});
};

$("#jumboBtn").click(function(){
	$("#jumboDiv").addClass("hidden");
	$("#miniDiv").removeClass("hidden");
});

$("#miniBtn").click(function(){
	$("#jumboDiv").removeClass("hidden");
	$("#miniDiv").addClass("hidden");
});

$("#buttonSpot").on('click', 'button', function(){
	searchTerm = this.innerText;
	populateGifs();
});

$("#formDiv").on('click', '#newTermButton', function(){
	var newTerm = $("#newTerm").val();
	termList.push(newTerm);
	populateButtons();
	event.preventDefault();
	$('form')[0].reset();
});

$("#formDiv").on('click', '#clearButton', function(){
	$("#gifSpot").clear();
});

$("#gifSpot").on('click','img', function(){
	var state = $(this).attr("data-state");

	if (state == "animateOff") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animateOn");
	}
	else if (state == "animateOn") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "animateOff");
	};
});
