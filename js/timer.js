$(function(){
    $('#login-btn').on('click',function (e) {
        e.preventDefault();
        var node = $(this);
        var form = node.closest('form');
        var params = form.serialize();
        $.ajax({
            url: 'https://api.moneypenny.me/'+form.find('#tenant_name').val()+'/login',
            data: params,
            method: 'POST',
            dataType: 'jsonp',
            error: function (jqXHR, status, error) {
                console.log(jqXHR.responseJSON, status, error);
            },
            success: function (data, status, jqXHR) {
                console.log(data, status, jqXHR);
            }
        });
    });
});
