/* global TrelloPowerUp */
var GRAY_ICON = './images/icon-gray.svg';
var MP_ICON = './images/timer.png';

var tokenLooksValid = function (token) {
    return /^[0-9a-f]{64}$/.test(token);
};

var isTrelloAuthorized = function () {
    if (!localStorage.getItem('token')) {
        var t = window.TrelloPowerUp.iframe();
        var oauthUrl = 'https://trello.com/1/authorize?expiration=never' +
            '&name=Trello%20for%20Chrome&scope=read,write,account&key=' + Trello.key() + '&callback_method=fragment' +
            '&return_url=' + encodeURIComponent(window.location.origin + '/auth.html');


        var authorizeOpts = {
            height: 680,
            width: 580,
            validToken: tokenLooksValid
        };
        t.authorize(oauthUrl, authorizeOpts)
            .then(function (token) {
                localStorage.setItem('token', token);
                return true
            })
            .then(function () {
                return t.closePopup();
            });
        return false;
    } else {
        return true;
    }
};


var cardButtonCallback = function (t) {
    var items = [];
    if (isMPAutorized()) {
        items.push({
            text: 'Track time',
            callback:openTimerCallback
        });
    } else {
        items.push({
            text: 'Setup MoneyPenny account',
            callback:openLoginModal
        });
    }
    return t.popup({
        title: 'MoneyPenny',
        items: items
    })
};

TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [{
            icon: MP_ICON,
            text: 'MoneyPenny',
            callback: cardButtonCallback
        }];
    },
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Settings',
            url: './settings.html',
            height: 184
        });
    },
    'card-badges':function (t, options) {
        return t.cards('all')
            .then(function (cards) {
                return [{
                    dynamic: function(cards) {
                        // we could also return a Promise that resolves to
                        // this as well if we needed to do something async first
                        console.log(cardData);
                        return {
                            text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
                            color: 'green',
                            refresh: 10 // in seconds
                        };
                    }
                }]
            });
    }
});