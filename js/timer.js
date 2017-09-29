$(function () {
    var t = window.TrelloPowerUp.iframe();
    t.sizeTo('.container');

    _mpAjax({
        method: 'GET',
        url: '/timer/projects',
        params: {},
        success: function (response) {
            var data = response.data;
            console.log(data);
        }
    });

    _mpAjax({
        method: 'GET',
        url: 'timer/status',
        params: {},
        success: function (response) {
            var data = response.data;
        },
        error: function (data) {
            if (data.status == 401) {
                localStorage.removeItem('mp_token');
            }
        }
    });
});