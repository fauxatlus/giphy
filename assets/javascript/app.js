$( document ).ready(function() {
var animals = ["Duck", "Cat", "Dog", "Horse", "Bunny", "Mouse", "Dragon", "Snake", "Bird", "Pig","Fish", "Bull", "Sheep"];
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < animals.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", animals[i]);
        gifButton.text(animals[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
function addNewButton(){
    $("#addGif").on("click", function(){
    var animal = $("#animal-input").val().trim();
    if (animal == ""){
      return false;
    }
    animals.push(animal);

    displayGifButtons();
    return false;
    });
}
function removeLastButton(){
    $("removeGif").on("click", function(){
    animals.pop(animal);
    displayGifButtons();
    return false;
    });
}
function displayGifs(){
    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=W8v97WFtgpED9wwtrfL5U7UbS1cr2fpz&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
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
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});