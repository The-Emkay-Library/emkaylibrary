
function searchBooks() {
    //get the last name
    var title_search_string  = document.getElementById('title_search').value;

    //construct the URL and redirect to it
    window.location = '/books/search/' + encodeURI(title_search_string);
}
