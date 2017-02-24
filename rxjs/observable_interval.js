let interval$ = Rx.Observable.interval(1000).take(5);

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

let subject$ = new Rx.Subject();

interval$.subscribe(subject$);

subject$.subscribe(observerA);

setTimeout(function() {
  subject$.subscribe(observerB);
}, 2000);
