function deleteMovie(id){

    $.ajax({

        url: '/moviess/' + id,
        type: 'DELETE',

        success: function(result){
            window.location.reload(true);
        }
    })
};
