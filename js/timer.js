$(function(){
    var options = {
        error : function (data) {
            $('#login-error').html(data.message);
        }
    };
    $('#login-btn').on('click',function (e) {
        e.preventDefault();
        var node = $(this);
        var form = node.closest('form');
        var params = form.serialize();
        $.ajax({
            url: 'https://api.moneypenny.me/'+form.find('#tenant_name').val()+'/login',
            data: params,
            method: 'POST',
            error: function (jqXHR, status, error) {
                var response = jqXHR.responseJSON;
                options.error(response.data);
            },
            success: function (data, status, jqXHR) {
                var data = data.data;
                var mp_token = {
                    tenant: $('#tenant_name').val(),
                    token: data.access_token
                };
                localStorage.setItem('mp_token', JSON.stringify(mp_token));
                var t = window.TrelloPowerUp.iframe();
                t.closeModal();
            }
        });
    });


});
