let result$ = Rx.Observable.interval(100).take(6)
                            .do((x) => console.log(`*Source ${x}`))
                            .map((x) => Math.random())
                            .multicast(() => new Rx.Subject(), (shared) => {
                              let sharedDelay = shared.delay(50);
                              let merged = shared.merge(sharedDelay);
                              return merged;
                            });
                            
result$.subscribe(x => console.log(x));
