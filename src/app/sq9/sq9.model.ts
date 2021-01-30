export enum Direction {
  Previous = 'previous',
  Next = 'next',
}

export enum DegreesEnum {
  dg0 = '0',
  dg45 = '0.25',
  dg60 = '0.333',
  dg90 = '0.5',
  dg120 = '0.666',
  dg135 = '0.75',
  dg180 = '1',
  dg225 = '1.25',
  dg240 = '1.333',
  dg270 = '1.5',
  dg300 = '1.666',
  dg315 = '1.75',
  dg360 = '2',
}

export const DegreesObj = {
  dg45: '0.25',
  dg60: '0.333',
  dg90: '0.5',
  dg120: '0.666',
  dg135: '0.75',
  dg180: '1',
  dg225: '1.25',
  dg240: '1.333',
  dg270: '1.5',
  dg300: '1.666',
  dg315: '1.75',
  dg360: '2',
};

export const StartingAngleNumbersFromTop = {
  dg45: 101,
  dg90: 106,
  dg135: 111,
  dg180: 116,
  dg225: 121,
  dg270: 127,
  dg315: 133,
  dg360: 139,
};

export const StartingAngleNumbersFromRight = {
  dg45: 111,
  dg90: 116,
  dg135: 121,
  dg180: 127,
  dg225: 133,
  dg270: 139,
  dg315: 145,
  dg360: 106,
};

export interface IClosetsNumbers {
  value: number;
  difference: number;
}

export interface IClosetsAngle {
  angle: DegreesStrType;
  difference: number;
}

export type DegreesType = '0.5' | '0.666' | '1' | '1.333' | '1.5' | '2';
export type DegreesStrType = 'dg45' | 'dg60' | 'dg90' | 'dg120' | 'dg135' | 'dg180' | 'dg225' | 'dg240' | 'dg270' | 'dg300' | 'dg315' | 'dg360';
