import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { first } from 'lodash';
import { ISq9Generate, ISq9GenerateInCircle } from './dto/sq9-generate.dto';
import { DegreesEnum, DegreesStrType, Direction, IClosetsAngle, IClosetsNumbers, StartingAngleNumbersFromTop } from './sq9.model';

@Injectable({
  providedIn: 'root'
})
export class Sq9Service {
  DEEP = 99; // deep to find angle

  private sq9Generate(
    { initValue, quantity, direction, degrees }: ISq9Generate
  ): BigNumber[] {
    const result: BigNumber[] = [];
    const calcFunction = direction === Direction.Previous
      ? this.sq9GenerateInside
      : this.sq9GenerateOutside;

    /**
     * Calculate the first value relative to the specified angle, and then calculate iterations from it by 360.
     */
    result.push(calcFunction({ value: initValue, degrees }));

    for (let i = 0; result.length < quantity; i++) {
      result.push(calcFunction({ value: result[i], degrees: DegreesEnum.dg360 }));
    }

    return result;
  }

  sq9GenerateOutside(
    { value, degrees }: ISq9GenerateInCircle
  ): BigNumber {
    return new BigNumber(value)
      .squareRoot()
      .plus(new BigNumber(degrees))
      .exponentiatedBy(2);
  }

  sq9GenerateInside(
    { value, degrees }: ISq9GenerateInCircle
  ): BigNumber {
    return new BigNumber(value)
      .squareRoot()
      .minus(new BigNumber(degrees))
      .exponentiatedBy(2);

  }

  findClosetsAngle(initNum: number): IClosetsAngle {
    const mainAngles = this.fillMainDg(this.DEEP);
    const angleKeys = Object.keys(mainAngles);
    const closetsFromAll = angleKeys
      .map((angle: string) => this.findClosestNum(mainAngles[angle], initNum));
    const closets: IClosetsNumbers = first(closetsFromAll.sort((el1, el2) => el1.difference - el2.difference)) as IClosetsNumbers;

    return {
      angle: first(angleKeys.filter((angle: string) => mainAngles[angle].includes(closets.value))) as DegreesStrType,
      difference: closets.difference,
    };
  }

  findClosestNum(
    arr: number[],
    lookingNum: number
  ): IClosetsNumbers {
    return arr.reduce((accum: IClosetsNumbers, current) => {
      return Math.abs(current - lookingNum) < Math.abs(accum.value - lookingNum)
        ? { value: current, difference: Math.abs(current - lookingNum) }
        : accum;
    }, { value: 0, difference: 0 });
  }

  findClosestFromDataTest(
    arr: any[],
    lookingNum: number
  ): IClosetsNumbers {
    return arr.reduce((accum: { value: number, difference: number }, current) => {
      return Math.abs(current.value - lookingNum) < Math.abs(accum.value - lookingNum)
        ? { value: current.value, difference: Math.abs(current.value - lookingNum) - Math.abs(accum.value - lookingNum) }
        : accum;
    }, { value: 0, difference: 0 });
  }

  sq9GenerateStr(data: ISq9Generate): string[] {
    return this.sq9Generate(data)
      .map((num) => num.toNumber().toFixed(2));
  }

  sq9GenerateDecimal(data: ISq9Generate): number[] {
    return this.sq9Generate(data)
      .map((num) => num.toNumber());
  }

  sq9GenerateNum(data: ISq9Generate): number[] {
    return this.sq9Generate(data)
      .map((num) => Math.round(num.toNumber()));
  }

  fillMainDg(deep: number = 100): any {
    return {
      dg45: [
        StartingAngleNumbersFromTop.dg45,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg45,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360}),
      ],
      dg90: [
        StartingAngleNumbersFromTop.dg90,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg90,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360})
      ],
      dg135: [
        StartingAngleNumbersFromTop.dg135,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg135,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        }),
      ],
      dg180: [
        StartingAngleNumbersFromTop.dg180,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg180,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        })
      ],
      dg225: [
        StartingAngleNumbersFromTop.dg225,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg225,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        }),
      ],
      dg270: [
        StartingAngleNumbersFromTop.dg270,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg270,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        }),
      ],
      dg315: [
        StartingAngleNumbersFromTop.dg315,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg315,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        }),
      ],
      dg360: [
        StartingAngleNumbersFromTop.dg360,
        ...this.sq9GenerateNum({
          initValue: StartingAngleNumbersFromTop.dg360,
          quantity: deep,
          direction: Direction.Next,
          degrees: DegreesEnum.dg360
        }),
      ],
    };
  }
}
