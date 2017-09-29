var mpAjax = function (options) {
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
        error: function (jqXHR, status, error) {
            var response = jqXHR.responseJSON;
            if(options.error){
                options.error(response.data);
            }
        },
        success: function (data, status, jqXHR) {
            console.log(data);
        }
    })
};


var openLoginModal = function (t) {
    return t.modal({
        title: 'Timer',
        url: './timer.html',
        height: 500,
        fullscreen: false,
        accentColor: '#e27702'
    });
};
