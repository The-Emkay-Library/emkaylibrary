
function searchArtists() {
    //get the last name
    var last_name_search_string  = document.getElementById('last_name_search').value;

    //construct the URL and redirect to it
    window.location = '/artists/search/' + encodeURI(last_name_search_string);
}
