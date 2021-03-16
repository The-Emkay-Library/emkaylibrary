function returnAlbum(patron_id, album_id){

    $.ajax({

        url: '/patrons_albums/' + patron_id + '/' + album_id,
        type: 'DELETE',

        success: function(result){
            window.location.reload(true);
        }
    })
};
