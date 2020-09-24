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

function search(zipCode) {

$.ajax(settings).done(function(response) {
    console.log(response);
    

for (i = 0; i < 10; i++) {

//Creating divs for the cards to be put into
    var zipCodeDiv = $("<div>");
    zipCodeDiv.addClass("");
    var zipCodeCardDiv = $("<div>");
    zipCodeCardDiv.addClass("card");

//Creating temporary variables for the application
    var name = data[i].restaurant_name;
    var address = data[i].address.formatted;
    var phone = data[i].restaurant_phone;
    var price = data[i].price_range;
    var foodType = data[i].cuisines;

}
})}});