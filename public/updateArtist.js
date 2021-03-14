function updateArtist(id){
    $.ajax({
        url: '/artists/' + id,
        type: 'PUT',
        data: $('#update-artists').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
