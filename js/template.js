/* global TrelloPowerUp */
var GRAY_ICON = './images/icon-gray.svg';

var cardButtonCallback = function(t){
  var items = Object.keys(parkMap).map(function(parkCode){
    var urlForCode = 'http://www.nps.gov/' + parkCode + '/';
    return {
      text: parkMap[parkCode],
      url: urlForCode,
      callback: function(t){
        return t.attach({ url: urlForCode, name: parkMap[parkCode] })
        .then(function(){
          return t.closePopup();
        })
      }
    };
  });

  return t.popup({
    title: 'Popup Search Example',
    items: items,
    search: {
      count: 5,
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });
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
    if(!localStorage.getItem('token')){
        var Promise = window.TrelloPowerUp.Promise;
        var t = window.TrelloPowerUp.iframe();

        var oauthUrl = 'https://trello.com/1/authorize?expiration=never' +
            '&name=Trello%20for%20Chrome&scope=read,write,account&key='+Trello.key()+'&callback_method=fragment' +
            '&return_url='+encodeURIComponent(window.location.origin+'/auth.html');

        var tokenLooksValid = function(token) {
            return /^[0-9a-f]{64}$/.test(token);
        };

        var authorizeOpts = {
            height: 680,
            width: 580,
            validToken: tokenLooksValid
        };

        t.authorize(oauthUrl, authorizeOpts)
            .then(function(token) {
                var permissions = t.getContext();
                console.log('then',token, permissions);
                return t.set('organization', 'private', 'token', token)
                    .catch(t.NotHandled, function() {
                        console.log('then',token);
                        return t.set('board', 'private', 'token', token);
                    });
            })
            .then(function() {
                // now that the token is stored, we can close this popup
                // you might alternatively choose to open a new popup
                return t.closePopup();
            });
    }
});