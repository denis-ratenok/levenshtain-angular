import { Injectable } from '@angular/core';

@Injectable()
export class RateReducerService {

  constructor() { }

  delay(func, time = 15) {
    let lock, execOnUnlock, values;
    return function f(...args) {
      values = args;
      if (!lock) {
        lock = true;
        var scope = this;
        setTimeout(() => {
          lock = false;
          if (execOnUnlock) {
            f.apply(scope, values);
            execOnUnlock = false;
          }
        }, time);
        return func.apply(this, values);
      } else execOnUnlock = true;
    }
  }
}
