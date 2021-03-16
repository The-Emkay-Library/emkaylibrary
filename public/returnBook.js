function returnBook(patron_id, book_id){

    $.ajax({

        url: '/patrons_books/' + patron_id + '/' + book_id,
        type: 'DELETE',

        success: function(result){
            window.location.reload(true);
        }
    })
};
