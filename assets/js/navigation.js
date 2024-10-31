'use strict';
// Adopt from JAVASCRIPT.INFO

const IGNORED_ELEMENTS = ['INPUT', 'TEXTAREA', 'SELECT'];
const KEYMAP_CTRL = new Map([
    ['ArrowLeft', 'prev'],
    ['ArrowRight', 'next'],
]);
const KEYMAP_SINGLE = new Map([
    ['Comma', 'prev'],
    ['Period', 'next'],
    ['KeyP', 'prev'],
    ['KeyN', 'next'],
]);

document.addEventListener('keydown', event => {
    const activeElem = document.activeElement;
    // don't react on Ctrl-> <- if in text
    if (!activeElem || IGNORED_ELEMENTS.indexOf(activeElem.tagName) >= 0){
        return;
    }

    const keymap = event.ctrlKey ? KEYMAP_CTRL : KEYMAP_SINGLE;
    const rel = keymap.get(event.code, null);
    if(!rel){
        return;
    }

    const link = document.querySelector(`link[rel="${rel}"]`);
    if (!link){
         return;
    }

    document.location = link.href;
    event.preventDefault();
});

// Reference: Vanilla JavaScript Double tap event detection on mobile using
// setTimeout
// <https://gist.github.com/ethanny2/44d5ad69970596e96e0b48139b89154b>
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const pointerTarget = document.body;
    const DOUBLE_TAP_DURATION = 500;
    let timeout = 0;
    let lastTap = new Date().getTime();

    pointerTarget.addEventListener('pointerup', (event) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        lastTap = currentTime;

        if (0 < tapLength && tapLength < DOUBLE_TAP_DURATION) {
            event.preventDefault();
            event.target.dispatchEvent(new CustomEvent("doubletap", {
                bubbles: true,
                detail: event
            }));
        } else {
            timeout = setTimeout(() => clearTimeout(timeout), DOUBLE_TAP_DURATION);
        }
    }, {passive: false});

    pointerTarget.addEventListener('doubletap', (event) => {
        const rel = event.detail.screenX < screen.width / 2 ? 'prev' : 'next';
        const link = document.querySelector(`link[rel="${rel}"]`);
        if (!link){
            return;
        }
        document.location = link.href;
    });
}
