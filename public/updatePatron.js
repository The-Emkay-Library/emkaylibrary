function updatePatron(id){

    $.ajax({

        url: '/patrons/' + id,
        type: 'PUT',
        data: $('#update-patrons').serialize(),

        success: function(result){
            window.location.replace("./");
        }
    })
};
