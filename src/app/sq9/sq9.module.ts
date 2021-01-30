import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngleFormatPipe } from './angle.pipe';
import { Sq9Component } from './sq9.component';



@NgModule({
  declarations: [
    Sq9Component,
    AngleFormatPipe,
  ],
  exports: [
    Sq9Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
  ]
})
export class Sq9Module { }
