$.ajaxSetup({
    complete : function (jqXHR,textStatus) {
    }
});

var MP_API_URL = 'https://api.moneypenny.me/';

var _MP_TOKEN = {
    tenant:'_____',
    token: ''
};

var _mpAjax = function (options) {
    var default_options = {
        method: 'GET',
        params: {},
        success: undefined,
        error: undefined,
        async: true
    };
    options = $.extend(true, default_options,options);
    options.url = MP_API_URL + _MP_TOKEN.tenant + '/' + options.url +'?token=' + _MP_TOKEN.token;
    $.ajax({
        url: options.url,
        method: options.method,
        data: options.params,
        async: options.async,
        error: function (jqXHR) {
            var response = jqXHR.responseJSON;
            if (response.data.status == 401) {
                localStorage.removeItem('mp_token');
            }
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

var openTimerCallback = function (t) {
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
        if(mp_token.hasOwnProperty('tenant') && mp_token.hasOwnProperty('token')){
            _MP_TOKEN = mp_token;
            result = true;
        }
    }
    return result;
};

var getMPTimerStatus = function (callback) {
    _mpAjax({
        method: 'GET',
        url: 'timer/status',
        params: {},
        success: function (response) {
            var data = response.data;
            localStorage.setItem('mp_timer',JSON.stringify(data));
            console.log(data);
            if(typeof callback == 'function'){
                callback(data.project_id,data.task_id,populateTasks);
            }
        },
        error: function (data) {
            if (data.status == 401) {
                localStorage.removeItem('mp_token');
            }
        }
    });
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
                    token: data.access_token,
                    expires: data.expires
                };
                localStorage.setItem('mp_token', JSON.stringify(mp_token));
                var t = window.TrelloPowerUp.iframe();
                t.storeSecret('mp_token',mp_token);
                t.closeModal();
            }
        });
    });
});


