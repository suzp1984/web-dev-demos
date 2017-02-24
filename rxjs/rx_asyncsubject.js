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

//let subject$ = new Rx.ReplaySubject(Number.POSITIVE_INFINITY, 200);
let subject$ = new Rx.AsyncSubject();
// ReplaySubject: replays many, before of after completion
// BehaviorSubject: replay one, only before completion
// AsyncSubject: replay one, only if completed

subject$.subscribe(observerA);
setTimeout(function() {
  subject$.subscribe(observerB);
}, 200);

setTimeout(() => subject$.next(1), 100);
setTimeout(() => subject$.next(2), 200);
setTimeout(() => subject$.next(3), 300);
setTimeout(() => subject$.next(3), 350);

