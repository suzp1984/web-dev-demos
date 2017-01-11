import Rx from 'rxjs';

function main(DOMSource) {
    const click$ = DOMSource;

    return {
        DOM: click$.startWith(null)
            .switchMap(() =>
                           Rx.Observable.timer(0, 1000)
                           .map(i => `Seconds elapsed ${i}`)
                          ),
        Log: click$.startWith(null)
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

function run(mainFn, drivers) {
    const proxyDOMSource = new Rx.Subject();
    const sinks = mainFn(proxyDOMSource);
//    const DOMSource = drivers.DOM(sinks.DOM);
//    DOMSource.subscribe(click => proxyDOMSource.next(click));

    Object.keys(drivers).forEach(key => {
        const DOMSource = drivers[key](sinks[key]);
        DOMSource.subscribe(click => proxyDOMSource.next(click));
    });
    
}

const drivers = {
    DOM: DOMDriver,
    Log: logDriver
};

run(main, drivers);
