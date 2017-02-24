let multicastInterval$ = Rx.Observable.interval(100).take(5)
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

multicastInterval$.connect();
multicastInterval$.subscribe(observerA);

setTimeout(function() {
  multicastInterval$.subscribe(observerB);
}, 400);
