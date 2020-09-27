//establish required global variables
// cityName = "";
// latitude = "";
// longitude = "";
var searches = [];
var zipCode = $("autocomplete-input").val();


$(document).ready(function () {

//Set onclick actions for search
    $("#foodSearchButton").on("click", function(event) {
        event.preventDefault();

    var citySearch = $("#autocomplete-input").val().trim();
    console.log(citySearch);
    search(citySearch);
    }
    )
 

function search(zipCode) {

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
    var name = response.result.data[i].restaurant_name;
    var address = response.result.data[i].address.formatted;
    var phone = response.result.data[i].restaurant_phone;
    var price = response.result.data[i].price_range;
    var foodType = response.result.data[i].cuisines;

    // console.log(name);
    // console.log(address);
    // console.log(phone);
    // console.log(price);
    // console.log(foodType);

    var nameOutput = $("<h5>").text("Restaurant Name: " + name);
    var addressOut = $("<p>").text("Address: " + address);
    var phoneOut = $("<p>").text("Phone Number: " + phone);
    var priceOut = $("<p>").text("Price Level: " + price);
    var foodTypeOut = $("<p>").text("Food Style: " + foodType);

//Append new outputs to created divs

    zipCodeDiv.append(nameOutput);
    zipCodeDiv.append(addressOut);
    zipCodeDiv.append(phoneOut);
    zipCodeDiv.append(priceOut);
    zipCodeDiv.append(foodTypeOut);

    zipCodeCardDiv.append(zipCodeDiv);

}
})}})