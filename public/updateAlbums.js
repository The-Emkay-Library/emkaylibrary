function updateAlbums(id){

    $.ajax({

        url: '/albums/' + id,
        type: 'PUT',
        data: $('#update-albums').serialize(),

        success: function(result){
            window.location.replace("./");
        }
    })
};
