var overlay = document.createElement('div');
var style = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    color: '#fff',
    fontSize: '80px'
};

for (var key in style) {
    overlay.style[key] = style[key];
}

overlay.innerHTML = 'Are you really bored?';
overlay.onclick = function() {
    document.body.removeChild(overlay);
};

document.body.appendChild(overlay);
