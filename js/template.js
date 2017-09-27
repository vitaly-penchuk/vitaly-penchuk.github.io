/* global TrelloPowerUp */
var GRAY_ICON = './images/icon-gray.svg';

var tokenLooksValid = function(token) {
    return /^[0-9a-f]{64}$/.test(token);
};

var cardButtonCallback = function(tt){
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
                console.log(t.getContext());
                localStorage.setItem('token', token);
                return true
            })
            .then(function() {
                // now that the token is stored, we can close this popup
                // you might alternatively choose to open a new popup
                return t.closePopup();
            });
    }
};

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
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

$(function(){

});