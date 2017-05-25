$('#employer_search').click(function () {
    console.log($('#employer_name').val());

    $.post('/employers/search', {
        method: 'employerSearch',
        name: $('#employer_name').val(),
    }, function (data, status) {
        var data = data.response;
        $('#searchResults ul').empty();
        data.employee.forEach(function (emp) {
            $('#searchResults ul').append('<li> ' + emp.name +' </li>');
        });
    });
});