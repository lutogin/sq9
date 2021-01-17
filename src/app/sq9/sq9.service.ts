import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { ISq9GenerateDto } from './dto/sq9-generate.dto';
import { DegreesEnum, Direction, StartingAngleNumbers } from './sq9.model';

@Injectable({
  providedIn: 'root'
})
export class Sq9Service {

  constructor() {
    console.log(' ---> ', this.fillMainDg());
  }

  // @ts-ignore
  private sq9Generate(
    { initNum, quantity, direction = Direction.Next, degrees = DegreesEnum.dg360 }: ISq9GenerateDto
  ): BigNumber[] {
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

    return result;
  }

  sq9GenerateStr(data: ISq9GenerateDto): string[] {
    return this.sq9Generate(data)
      .map((num) => num.toNumber().toFixed(2));
  }

  sq9GenerateDecimal(data: ISq9GenerateDto): number[] {
    return this.sq9Generate(data)
      .map((num) => num.toNumber());
  }

  sq9GenerateNum(data: ISq9GenerateDto): number[] {
    return this.sq9Generate(data)
      .map((num) => Math.round(num.toNumber()));
  }

  fillMainDg(deep: number = 100): any {
    return {
      dg45: [
        StartingAngleNumbers.dg45,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg45,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg45
        }),
      ],
      dg90: [
        StartingAngleNumbers.dg90,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg90,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg90
        })
      ],
      dg135: [
        StartingAngleNumbers.dg135,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg135,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg135
        }),
      ],
      dg180: [
        StartingAngleNumbers.dg180,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg180,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg180
        })
      ],
      dg225: [
        StartingAngleNumbers.dg225,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg225,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg225
        }),
      ],
      dg270: [
        StartingAngleNumbers.dg270,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg270,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg270
        }),
      ],
      dg315: [
        StartingAngleNumbers.dg315,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg315,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg315
        }),
      ],
      dg360: [
        StartingAngleNumbers.dg360,
        ...this.sq9GenerateNum({
          initNum: StartingAngleNumbers.dg360,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        }),
      ],
    };
  }
}
