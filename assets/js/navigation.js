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

const SWIPE_THRESHOLD = 200;
const pointerTarget = document.querySelector('main');

pointerTarget.addEventListener("pointerdown", (eDown) => {
    function onPointerUp(eUp){
        //pointerTarget.releasePointerCapture(eUp.Id);
        pointerTarget.removeEventListener("pointerup", onPointerUp)
        //console.debug(`Pointer up ${eUp.clientX} ${eUp.clientY}`);

        const diff = eUp.clientX - eDown.clientX;
        if(Math.abs(diff) < SWIPE_THRESHOLD){
            return;
        }

        const rel = diff > 0 ? 'prev' : 'next';
        //console.debug(rel)
        const link = document.querySelector(`link[rel="${rel}"]`);
        if (!link){
             return;
        }
        document.location = link.href;
        eUp.preventDefault();
    }

    //console.debug(`Pointer down ${eDown.clientX} ${eDown.clientY}`);
    //pointerTarget.setPointerCapture(eDown.Id);
    pointerTarget.addEventListener("pointerup", onPointerUp);
});
