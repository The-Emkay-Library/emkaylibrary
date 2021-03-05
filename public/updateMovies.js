function updateMovie(id){

    $.ajax({

        url: '/movies/' + id,
        type: 'PUT',
        data: $('#update-movies').serialize(),

        success: function(result){
            window.location.replace("./");
        }
    })
};
