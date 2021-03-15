function updateBook(id){

    $.ajax({

        url: '/books/' + id,
        type: 'PUT',
        data: $('#update-books').serialize(),

        success: function(result){
            window.location.replace("./");
        }
    })
};
