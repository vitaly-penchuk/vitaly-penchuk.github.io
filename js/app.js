$.ajaxSetup({
    complete : function (jqXHR,textStatus) {
        console.log(jqXHR,textStatus);
    }
});

var _mpAjax = function (options) {
    var default_options = {
        method: 'GET',
        url: '',
        params: {},
        success: undefined,
        error: undefined
    };
    $.extend(true, options, default_options);
    $.ajax({
        method: method,
        data: params,
        error: function (jqXHR) {
            var response = jqXHR.responseJSON;
            if(options.error){
                return options.error(response.data);
            }
        },
        success: function (data, status, jqXHR) {
            if(options.success){
                return options.success(data);
            }
        }
    })
};


var openLoginModal = function (t) {
    return t.modal({
        title: 'MoneyPenny Login',
        url: './login.html',
        height: 400,
        fullscreen: false,
        accentColor: '#e27702'
    });
};

var openTimer = function (t) {
    return t.popup({
        title: 'Timer',
        url: './timer.html',
        height: 184
    });
};

var isMPAutorized = function () {
    var result = false;
    if(localStorage.getItem('mp_token')){
        var mp_token = JSON.parse(localStorage.getItem('mp_token'));
        if(mp_token.hasAttribute('tenant') && mp_token.hasAttribute('token')){

        }
    }
    return result;
};

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
                t.storeSecret('mp_token',mp_token);
                t.closeModal();
            }
        });
    });
});


