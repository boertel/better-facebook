function applyStyle(element, style) {
    for (var key in style) {
        element.style[key] = style[key];
    }
    return element;
}

function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
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

function pluralize(value, text) {
    if (value) {
        return value + ' ' + (Math.abs(value) === 1 ? text : text + 's');
    }
    return ''
}

var KEY = 'lastVisit';

var previous = +localStorage.getItem(KEY);
var now = new Date().getTime();

var LIMIT = 5 * 60 * 1000;
var delta = convertMS(LIMIT + previous - now);
var minutes = parseInt((((LIMIT + previous) - now) / 1000 / 60), 10)
var text = minutes >= 0 ? 'You have to wait' : 'Good job! You haven\'t being on Facebook for';
var wait = '<br><em><small style="font-size: 0.4em">' + text + ' ' + pluralize(delta.day, 'day') + pluralize(delta.hour, 'hour') + pluralize(delta.minute, 'minute') + '.</small></em>'
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
