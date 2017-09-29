
$(function () {
    /*
     if (isMPAutorized()) {
     _mpAjax({
     method: 'GET',
     url: 'timer/status',
     async: false,
     params: {},
     success: function (response) {
     var data = response.data
     },
     error: function (data) {
     if (data.status == 401) {
     localStorage.removeItem('mp_token');
     }
     }
     });
     }
     */
    var t = window.TrelloPowerUp.iframe();
    t.sizeTo('.container');
});