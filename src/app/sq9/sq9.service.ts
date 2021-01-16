import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { DegreesObj, Direction } from './sq9.model';

@Injectable({
  providedIn: 'root'
})
export class Sq9Service {

  constructor() { }

  sq9Generate(
    initNum: number,
    quantity: number = 3,
    direction: Direction = Direction.Previous,
    degrees: string | number = DegreesObj.d360,
  ): string[] {
    const result = [];
    let currentValue = new BigNumber(initNum);

    for (let i = 0; i < quantity; i++) {
      const sqrtFromNum = currentValue.squareRoot();
      const findValue = direction === Direction.Previous
        ? sqrtFromNum.minus(new BigNumber(degrees)).exponentiatedBy(2)
        : sqrtFromNum.plus(new BigNumber(degrees)).exponentiatedBy(2);
      result.push(findValue);
      currentValue = findValue;
    }

    return result.map((num) => num.toNumber().toFixed(2));
  }
}
