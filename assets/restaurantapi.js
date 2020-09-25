//establish required global variables
cityName = "";
latitude = "";
longitude = "";
var searches = [];
var zipCode = $("").val().trim();

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" + zipCode + "?page=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
		"x-rapidapi-key": "951e66441emshfc6c776ab574133p105a72jsnbdc9d6149898"
	}
}
$(document).ready(function () {

//Set onclick actions for search
    $("button").on("click", function(event) {
        event.preventDefault();

    var citySearch = $("button").val().trim();
    console.log(citySearch);
    search(citySearch);
    }
    )
 
$.ajax(settings).done(function(response) {
    console.log(response);

    localStorage.setItem("storedSearch", response);

for (i = 0; i < 10; i++) {

//Creating divs for the cards to be put into
    var zipCodeDiv = $("<div>");
    zipCodeDiv.addClass("");
    var zipCodeCardDiv = $("<div>");
    zipCodeCardDiv.addClass("");

//Creating temporary variables for the application
    var name = data[i].restaurant_name;
    var address = data[i].address.formatted;
    var phone = data[i].restaurant_phone;
    var price = data[i].price_range;
    var foodType = data[i].cuisines;

    var nameOutput = $("<h4>").text("Restaurant Name: " + name);
    var addressOut = $("<h4>").text("Address: " + address);
    var phoneOut = $("<h4>").text("Phone Number: " + phone);
    var priceOut = $("<h4>").text("Price Level: " + price);
    var foodTypeOut = $("<h4>").text("Food Style: " + foodType);

//Append new outputs to created divs

    zipCodeDiv.append(nameOutput);
    zipCodeDiv.append(addressOut);
    zipCodeDiv.append(phoneOut);
    zipCodeDiv.append(priceOut);
    zipCodeDiv.append(foodTypeOut);

    zipCodeCardDiv.append(zipCodeDiv);

}
})}})