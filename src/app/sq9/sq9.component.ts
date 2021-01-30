import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DegreesObj, Direction, IClosetsAngle } from './sq9.model';
import { Sq9Service } from './sq9.service';

export enum BackgroundColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
}

@Component({
  selector: 'app-sq9',
  templateUrl: './sq9.component.html',
  styleUrls: ['./sq9.component.css'],
  providers: [
    Sq9Service,
    NgForm,
  ],
})
export class Sq9Component implements OnInit {
  initNum = '';
  quantityOutside = 10;
  quantityInside = 3;
  selectedDegree = '';
  degrees: string[] = [];

  closetsAngle = 0;
  closetsClass = '';

  resultsOutside: string[] = [];
  resultsInside: string[] = [];

  constructor(
    private readonly sq9Service: Sq9Service,
  ) {}

  generate(): void {
    this.resultsOutside = this.sq9Service.sq9GenerateStr({
      initValue: Number(this.initNum),
      quantity: this.quantityOutside,
      direction: Direction.Next,
      // @ts-ignore
      degrees: DegreesObj[this.selectedDegree]
    });

    this.resultsInside = this.sq9Service.sq9GenerateStr({
      initValue: Number(this.initNum),
      quantity: this.quantityInside,
      direction: Direction.Previous,
      // @ts-ignore
      degrees: DegreesObj[this.selectedDegree]
    });

    this.writeClosetsAngleField();
  }

  private getClosetsAngle(): IClosetsAngle {
    return this.sq9Service.findClosetsAngle(Number(this.initNum));
  }

  private writeClosetsAngleField(): void {
    const closetsAngleData = this.getClosetsAngle();
    this.closetsAngle = this.parseNum(closetsAngleData.angle);

    switch (closetsAngleData.difference) {
      case 0:
        this.closetsClass = BackgroundColor.Success;
        break;
      case 1:
        this.closetsClass = BackgroundColor.Primary;
        break;
      case 2:
        this.closetsClass = BackgroundColor.Warning;
        break;
      default:
        this.closetsClass = BackgroundColor.Danger;
        break;
    }
  }

  parseNum(value: string): number {
    return Number(value.replace(/\D+/g, ''));
  }

  clearInitNum(evt: any): void {
    this.initNum = evt.target.classList.contains('ng-pristine')
      ? ''
      : this.initNum;
  }

  checkInitNum(): void {
    if (Number(this.initNum) < 1) {
      this.initNum = '1';
    }
  }


  ngOnInit(): void {
    const keyDegrees = Object.keys(DegreesObj);

    this.initNum = '225';
    // this.quantityOutside = 6;
    // this.quantityInside = 3;
    this.selectedDegree = keyDegrees[keyDegrees.length - 1];
    this.degrees = keyDegrees;
  }
}
