function applyStyle(element, style) {
    for (var key in style) {
        element.style[key] = style[key];
    }
    return element;
}

var overlay = applyStyle(document.createElement('div'), {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 999999,
    color: '#fff',
    fontSize: '80px'
});

var ball = applyStyle(document.createElement('div'), {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: 'red',
});


var KEY = 'lastVisit';

var previous = +localStorage.getItem(KEY);
var now = new Date().getTime();

var LIMIT = 5 * 60 * 1000;

var minutes = parseInt((((LIMIT + previous) - now) / 1000 / 60), 10);
var text = minutes >= 0 ? 'You have to wait' : 'Good job! You haven\'t being on Facebook for';
var wait = '<br><em><small style="font-size: 0.4em">' + text + ' ' + Math.abs(minutes) + ' ' + (Math.abs(minutes) === 1 ? 'minute' : 'minutes') + '.</small></em>'
overlay.innerHTML = 'Are you really bored?' + wait;

//overlay.appendChild(ball);

if (now - previous > LIMIT) {
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };
}

var monkey = window.onbeforeunload;
window.onbeforeunload = function (evt) {
    monkey && monkey(evt);
    localStorage.setItem(KEY, new Date().getTime());
}

var isFromFacebook = document.referrer.startsWith('https://www.facebook.com')
if (!isFromFacebook) {
    document.body.appendChild(overlay);
}
