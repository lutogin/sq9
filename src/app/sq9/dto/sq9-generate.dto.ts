import BigNumber from 'bignumber.js';
import { DegreesEnum, Direction } from '../sq9.model';

export interface ISq9Generate {
  initValue: number;
  quantity: number;
  direction: Direction;
  degrees: DegreesEnum;
}

export interface ISq9GenerateInCircle {
  value: number | BigNumber;
  degrees: DegreesEnum | BigNumber;
}
