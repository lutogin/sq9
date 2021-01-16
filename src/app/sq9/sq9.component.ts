import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Direction } from './sq9.model';
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

  initNum = 0;
  quantityOutside = 6;
  quantityInside = 3;
  thead: number[] = [];
  resultsOutside: string[] = [];
  resultsInside: string[] = [];

  constructor(
    private readonly sq9Service: Sq9Service,
  ) {}

  generateNumber(): void {
    this.resultsOutside = this.sq9Service.sq9Generate(
      this.initNum,
      this.quantityOutside,
      Direction.Next
    );

    this.resultsInside = this.sq9Service.sq9Generate(
      this.initNum,
      this.quantityInside,
      Direction.Previous
    );
  }

  findClosetsAngle(): void {
    return;
  }


  ngOnInit(): void {
  }

}
