let multicastInterval$ = Rx.Observable.interval(100)
                            .do((x) => console.log(`*Source ${x}`))
                            .multicast(new Rx.ReplaySubject(3));

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

refMulticast$ = multicastInterval$.refCount();

let subA = refMulticast$.subscribe(observerA);
let subB;
setTimeout(function() {
  subB = refMulticast$.subscribe(observerB);
}, 400);

setTimeout(function() {
  subA.unsubscribe();
}, 1000);
setTimeout(() => {
  subB.unsubscribe();
}, 1500);
