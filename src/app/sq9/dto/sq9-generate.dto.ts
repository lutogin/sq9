import { DegreesEnum, Direction } from '../sq9.model';

export interface ISq9GenerateDto {
  initNum: number | string;
  quantity: number;
  direction: Direction;
  degrees?: DegreesEnum;
}
