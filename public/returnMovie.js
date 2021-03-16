function returnMovie(patron_id, movie_id){

    $.ajax({

        url: '/patrons_movies/' + patron_id + '/' + movie_id,
        type: 'DELETE',

        success: function(result){
            window.location.reload(true);
        }
    })
};
