import Rx from 'rxjs';
import {run} from '@cycle/rxjs-run';

function main(sources) {
    const click$ = sources.DOM;
    const e$ = sources.Log;
    return {
        DOM: click$.startWith(null)
            .switchMap(() =>
                           Rx.Observable.timer(0, 1000)
                           .map(i => `Seconds elapsed ${i}`)
                          ),
        Log: e$.startWith(null)
            .switchMap(() =>
                       Rx.Observable.timer(0, 2000).map(i => i*2))
    };
}

function DOMDriver(text$) {
    text$.subscribe(text => {
        const container = document.querySelector('#app');
        container.textContent = text;
    });

    const DOMSource = Rx.Observable.fromEvent(document, 'click');
    return DOMSource;
}

function logDriver(text$) {
    text$.subscribe(text => {
        console.log(text);
    });

    const DOMSource = Rx.Observable.fromEvent(document, 'click');
    return DOMSource;
}


const drivers = {
    DOM: DOMDriver,
    Log: logDriver
};

run(main, drivers);
