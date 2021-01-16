import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { DegreesObj, Direction } from './sq9.model';

@Injectable({
  providedIn: 'root'
})
export class Sq9Service {

  constructor() { }

  sq9Generate(
    initNum: number | string,
    quantity: number = 3,
    direction: Direction = Direction.Previous,
    degrees: string | number = DegreesObj.d360,
  ): string[] {
    const result = [];
    const sqrtFromNum = new BigNumber(initNum).squareRoot();

    for (let i = 1; i <= quantity; i++) {
      const findValue = direction === Direction.Previous
        ? sqrtFromNum
          .minus(new BigNumber(degrees).multipliedBy(i))
          .exponentiatedBy(2)
        : sqrtFromNum
          .plus(new BigNumber(degrees).multipliedBy(i))
          .exponentiatedBy(2);
      result.push(findValue);
    }

    return result.map((num) => num.toNumber().toFixed(2));
  }
}
