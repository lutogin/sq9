import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DegreesObj, Direction } from './sq9.model';
import { Sq9Service } from './sq9.service';

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
  quantityOutside = 6;
  quantityInside = 3;
  selectedDegree = '';
  degrees: string[] = [];

  resultsOutside: string[] = [];
  resultsInside: string[] = [];

  constructor(
    private readonly sq9Service: Sq9Service,
  ) {}

  generateNumber(): void {
    this.resultsOutside = this.sq9Service.sq9Generate(
      this.initNum,
      this.quantityOutside,
      Direction.Next,
      // @ts-ignore
      DegreesObj[this.selectDegree]
    );

    this.resultsInside = this.sq9Service.sq9Generate(
      this.initNum,
      this.quantityInside,
      Direction.Previous,
      // @ts-ignore
      DegreesObj[this.selectDegree]
    );
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

    this.initNum = '215';
    this.quantityOutside = 6;
    this.quantityInside = 3;
    this.selectedDegree = keyDegrees[keyDegrees.length - 1];
    this.degrees = keyDegrees;
  }
}
