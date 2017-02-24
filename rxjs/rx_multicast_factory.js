let multicastFactory$ = Rx.Observable.interval(100).take(6)
                            .do((x) => console.log(`*Source ${x}`))
                            .multicast(() => new Rx.Subject())
                            .refCount();

let observerA = {
  next: function(x) { console.log(`A next ${x}`);},
  error: function(e) { console.log(`A error ${e}`);},
  complete: function() { console.log(`A done`);}
};

let observerB = {
  next: function(x) { console.log(`--B next ${x}`);},
  error: function(e) { console.log(`--B error ${e}`);},
  complete: function() { console.log(`--B done`);}
};

let subA = multicastFactory$.subscribe(observerA);
let subB;
setTimeout(function() {
  subB = multicastFactory$.subscribe(observerB);
}, 400);

setTimeout(function() {
  subA.unsubscribe();
}, 1000);
setTimeout(() => {
  subB.unsubscribe();
}, 1500);

setTimeout(() => {
    multicastFactory$.subscribe(observerA);
}, 3000);
