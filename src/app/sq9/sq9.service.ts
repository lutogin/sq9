import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { Direction } from './sq9.model';

@Injectable({
  providedIn: 'root'
})
export class Sq9Service {
  g90 = new BigNumber('0.5');
  g120 = new BigNumber('0.666');
  g180 = new BigNumber(1);
  g240 = new BigNumber('1.333');
  g270 = new BigNumber('1.5');
  g360 = new BigNumber(2);
  constructor() { }

  sq9Generate(
    initNum: number,
    quantity: number = 1,
    direction: Direction = Direction.Previous
  ): string[] {
    const result = [];
    let currentValue = new BigNumber(initNum);

    for (let i = 0; i < quantity; i++) {
      const sqrtFromNum = currentValue.squareRoot();
      const findValue = direction === Direction.Previous
        ? sqrtFromNum.minus(this.g360).exponentiatedBy(new BigNumber(2))
        : sqrtFromNum.plus(this.g360).exponentiatedBy(new BigNumber(2));
      result.push(findValue);
      currentValue = findValue;
    }

    return result.map((num) => num.toNumber().toFixed(2));
  }
}
