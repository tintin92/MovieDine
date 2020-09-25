// Global Variables for OTT
var searchResults = []; // Use this array with the title info portion of the OTT api to append movie details to the page
var previousSearches = [];


// With the search OTT info
var imdbID = ""; // Store all the imdbID's into the search results array

// Variables to be created dynamically when looping through an array
var streamAvailability = []; // Store the (Platform Name)  +  (Link to movie on that platform). Will probably make a list to append to the page.

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
        console.log(response);
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
        // buildSearchResults(searchResults); (will uncomment when buildSearchResults function is completed)
    });
}

// Will finish this later when I have places to append to.
function buildSearchResults(array)
{
    for (var i = 0; i < array.length; i++)
    {
        var movieImg = array[i].imageurl[0];
        var movieTitle = array[i].title;
        var movieSummary = array[i].synopsis;
        var movieRelease = array[i].released;

        // Below I will dynamically create elements to append to the page.

    }
}

function storeSearches(x)
{
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches));

    var searchesText = x;
    if (searchesText === "" || previousSearches.includes(searchesText))
    {
        return;
    }

    previousSearches.push(searchesText);
    searchesText = "";

    storeSearches(searchesText);
    // renderSearches(); (will uncomment when renderSearches function is completed)
}

// Will build this when I have the ID's of buttons, div's, etc.
function renderSearches()
{

}

function init()
{
    var storedSearches = JSON.parse(localStorage.getItem("previousSearches"));

    if (storedSearches !== null)
    {
        previousSearches = storedSearches;
    }

    // renderSearches(); (will uncomment when renderSearches function is completed)
}