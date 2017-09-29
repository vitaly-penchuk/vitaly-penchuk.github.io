/* global TrelloPowerUp */
var GRAY_ICON = './images/icon-gray.svg';
var MP_ICON = './images/timer.png';

var tokenLooksValid = function(token) {
    return /^[0-9a-f]{64}$/.test(token);
};

var isTrelloAuthorized = function () {
    if(!localStorage.getItem('token')){
        var t = window.TrelloPowerUp.iframe();
        var oauthUrl = 'https://trello.com/1/authorize?expiration=never' +
            '&name=Trello%20for%20Chrome&scope=read,write,account&key='+Trello.key()+'&callback_method=fragment' +
            '&return_url='+encodeURIComponent(window.location.origin+'/auth.html');


        var authorizeOpts = {
            height: 680,
            width: 580,
            validToken: tokenLooksValid
        };
        t.authorize(oauthUrl, authorizeOpts)
            .then(function(token) {
                localStorage.setItem('token', token);
                return true
            })
            .then(function() {
                return t.closePopup();
            });
        return false;
    }else{
        return true;
    }
};



var cardButtonCallback = function(t){
    if(localStorage.getItem('mp_token')){

    }else{
        return openLoginModal(t);
    }
};

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    if(isMPAutorized()){
        _mpAjax({
            method: 'GET',
            url: 'timer/status',
            params: {},
            success: function (data) {
                console.log(data)
            },
            error: function (data) {
                console.log('error',data);
            }
        })
    }
    return [{
      icon: MP_ICON,
      text: 'Start timer',
      callback: cardButtonCallback
    }];
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});