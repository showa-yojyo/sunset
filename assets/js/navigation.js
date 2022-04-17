'use strict';
// Adopt from JAVASCRIPT.INFO

const IGNORED_ELEMENTS = ['INPUT', 'TEXTAREA', 'SELECT'];
const KEY_BINDS = new Map([
    ['ArrowLeft', 'prev'],
    ['ArrowRight', 'next'],
]);

document.addEventListener('keydown', event => {
    const activeElem = document.activeElement;
    // don't react on Ctrl-> <- if in text
    if (!activeElem || IGNORED_ELEMENTS.indexOf(activeElem.tagName) >= 0){
        return;
    }

    if (!event.ctrlKey) {
        return;
    }

    const rel = KEY_BINDS.get(event.key, null);
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
