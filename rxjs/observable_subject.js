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

// let subject$ = new Rx.Subject(0);
let subject$ = new Rx.BehaviorSubject(0);

subject$.subscribe(observerA);
setTimeout(function() {
  subject$.subscribe(observerB);
}, 2000);

subject$.next(1);
subject$.next(2);
subject$.next(3);
