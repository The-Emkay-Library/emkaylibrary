
function searchMovies() {
    //get the last name
    var title_search_string  = document.getElementById('title_search').value;

    //construct the URL and redirect to it
    window.location = '/movies/search/' + encodeURI(title_search_string);
}
