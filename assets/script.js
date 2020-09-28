// Global Variables for OTT
var searchResults = []; // Use this array with the title info portion of the OTT api to append movie details to the page
var previousSearches = [];
var searchText = "";
var movieSearchButton = $("#searchButton");
var movieSearchInput = $("#searchInput");
var prevSearch = $("#prevSearch");

var backButtonEl = $("<button>");
backButtonEl.addClass("btn col s1");
backButtonEl.attr("style", "float:left");
backButtonEl.attr("id", "backButton");
backButtonEl.attr("type", "submit");
backButtonEl.attr("name", "action");

var backArrow = $("<i>");
backArrow.addClass("fas fa-arrow-left");
backButtonEl.append(backArrow);
 
$(document).ready(function ()
{
    init();

    movieSearchButton.on("click", function (event)
    {
        event.preventDefault();
 
        searchText = movieSearchInput.val().trim();
        movieSearch(searchText);
    });
 
    function movieSearch(title)
    {
        var settings = 
        {
            "async": true,
            "crossDomain": true,
            "url": "https://ott-details.p.rapidapi.com/search?page=1&title=" + title,
            "method": "GET",
            "headers": 
            {
                "x-rapidapi-host": "ott-details.p.rapidapi.com",
                "x-rapidapi-key": "951e66441emshfc6c776ab574133p105a72jsnbdc9d6149898"
            }
        }
        
        $.ajax(settings).done(function (response) 
        {
            if (response.length <= 0)
            {
                return; 
            }
            for (i = 0; i < response.results.length; i++)
            {
                if (i == 10)
                {
                    break;
                }
                else
                {
                    searchResults.push(response.results[i]);
                }
            }
            buildSearchResults(searchResults);
        });
    }
 
    function buildSearchResults(array)
    {
        $("main").text("");
        var h1El = $("<h1>");
        h1El.text("Showing results for: " + searchText);
        h1El.append($("<br>"));
        h1El.append(backButtonEl);
        $("main").append(h1El);

        var searchesDiv = $("<div>");
        searchesDiv.attr("id", "movieSearches");
        searchesDiv.attr("style", "width: 350px; margin: auto;");

        if (array.length <= 0)
        {
            searchesDiv.append($("<h4>There are no results</h4>"));
            searchesDiv.append($("<h4>For this show/movie</h4>"))
        }

        for (var i = 0; i < array.length; i++)
        {
            var movieImg = array[i].imageurl[0];
            var movieSummary = array[i].synopsis;
            var movieId = array[i].imdbid;
            var movieTitle = array[i].title;

            // Below I will dynamically create elements to append to the page.
            var button = $("<button>");
            button.attr("data-id", movieId);
            button.attr("style", "padding: 0; border: none; background: none; cursor: pointer;");
            button.attr("type", "submit");
            button.attr("name", "action");

            var styleDiv = $("<div>");
            styleDiv.attr("style", "width: 350px; margin: auto;");
            button.append(styleDiv);

            var rowDiv = $("<div>");
            rowDiv.addClass("row card");
            styleDiv.append(rowDiv);

            var cardImageDiv = $("<div>");
            cardImageDiv.addClass("card-image");
            rowDiv.append(cardImageDiv);

            var posterEl = $("<img>");
            posterEl.attr("src", movieImg);
            posterEl.attr("data-id", movieId);
            posterEl.attr("style", "width: 350px; height:515px;");
            var cardContentEl = $("<div>");
            cardContentEl.addClass("card-content");
            cardContentEl.attr("data-id", movieId);

            var summaryEl = $("<p>");
            summaryEl.text(movieTitle + ": " + movieSummary);
            summaryEl.attr("data-id", movieId);
            cardContentEl.append(summaryEl);
            cardImageDiv.append(posterEl, cardContentEl);

            searchesDiv.append(button);
        }
        $("main").append(searchesDiv);

        $("#backButton").on("click", function (event)
        {
            event.preventDefault();
            location.reload();
        });

        $("#movieSearches").on("click", function(event)
        {
            var element = event.target;

            if (element.matches("button") === true || element.matches("img") === true || element.matches("div") === true || element.matches("p") === true)
            {
                var id = element.getAttribute("data-id");
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://ott-details.p.rapidapi.com/gettitleDetails?imdbid=" + id,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "ott-details.p.rapidapi.com",
                        "x-rapidapi-key": "951e66441emshfc6c776ab574133p105a72jsnbdc9d6149898"
                    }
                }
                
                $.ajax(settings).done(function (response) 
                {
                    storeSearches(response);
                    $("main").text("");
                    $("main").append(backButtonEl);
                    // Creates a div to hold the movie
                    var movieDiv = $("<div>");
                    
                    var movieName = response.title;
                    var titleDisplay = $("<h1>" + movieName + "</h1>");
                    movieDiv.append(titleDisplay);
                    movieDiv.append($("<br>"));
                    // Retrieves the Rating Data
                    var rating = response.imdbrating;
                    // Creates an element to have the rating displayed
                    var ratingDisplay = $("<h3>Rating: " + rating + "</h3>");
                    // Displays the rating
                    movieDiv.append(ratingDisplay);
                    // Retrieves the release year
                    var year = response.released;
                    // Creates an element to hold the release year
                    var yearDisplay = $("<h3>Year: " + year + "</h3>");
                    // Displays the release year
                    movieDiv.append(yearDisplay);
                    // Retrieves the plot
                    var plot = response.synopsis;
                    // Creates an element to hold the plot
                    var plotDisplay = $("<p>Plot: " + plot + "</p>");
                    // Appends the plot
                    movieDiv.append(plotDisplay); 
                    // Creates an element to hold the image
                    var image = response.imageurl;
                    var imageDisplay = $("<img>")
                    imageDisplay.attr("src", image);
                    // Appends the image
                    movieDiv.append(imageDisplay);

                    var availabilityDisplay = $("<h2>Streaming Availability</h2>");
                    movieDiv.append(availabilityDisplay);

                    var length = response.streamingAvailability.country.US.length;
                    var streamAvailability = [];

                    for (var k = 0; k < length; k++)
                    {
                        streamAvailability.push(response.streamingAvailability.country.US[k]);
                    }

                    for (var j = 0; j < streamAvailability.length; j++)
                    {
                        var platform = streamAvailability[j].platform;

                        var platformDisplay = $("<h5>Platform: " + platform + "</h5>");
                        movieDiv.append(platformDisplay);

                        var link = streamAvailability[j].url;
                        var platformLink = $("<a>Link: " + link + "</a>");
                        platformLink.attr("href", link);
                        movieDiv.append(platformLink);
                    }

                    $("main").append(movieDiv);

                    $("#backButton").on("click", function (event)
                    {
                        event.preventDefault();
                        location.reload();
                    });

                });
            }
        });
    }
 
    function storeSearches(x)
    {
        localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
 
        var searchesText = x;
        if (searchesText === "" || previousSearches.includes(searchesText))
        {
            return;
        }
 
        if (previousSearches.length >= 3)
        {
            previousSearches.shift();
        }

        previousSearches.push(searchesText);
        searchesText = "";
 
        storeSearches(searchesText);
    }
 
    // Will build this when I have the ID's of buttons, div's, etc.
    function renderSearches()
    {
        for (var i = 0; i < previousSearches.length; i++)
        {
            var divCol = $("<div>");
            divCol.addClass("col s2");

            var divCard = $("<div>");
            divCard.addClass("card");
            divCol.append(divCard);

            var divCardImage = $("<div>");
            divCardImage.addClass("card-image");
            divCard.append(divCardImage);

            var image = $("<img>");
            image.attr("src", previousSearches[i].imageurl[0]);
            divCardImage.append(image);

            var divCardContent = $("<div>");
            divCardContent.addClass("card-content");
            divCardImage.append(divCardContent);

            var synopsis = $("<p>");
            synopsis.text(previousSearches[i].synopsis);
            divCardContent.append(synopsis);

            prevSearch.prepend(divCol);
        }
    }
 
    function init()
    {
        var storedSearches = JSON.parse(localStorage.getItem("previousSearches"));
 
        if (storedSearches !== null)
        {
            previousSearches = storedSearches;
        }
 
        renderSearches();
    }
});