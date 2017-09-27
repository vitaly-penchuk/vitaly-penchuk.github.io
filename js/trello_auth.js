var token = window.location.hash.substring(7);
var authorize;

try {
    if (window.opener && typeof window.opener.authorize === 'function') {
        authorize = window.opener.authorize;
    }
} catch (e) {
    // Security settings are preventing this, fall back to local storage.
}

if (authorize) {
    try {
        authorize(token);
    } catch (e) {
        localStorage.setItem('token', token);
    }
} else {
    localStorage.setItem('token', token);
}

setTimeout(function(){ window.close(); }, 100000);
