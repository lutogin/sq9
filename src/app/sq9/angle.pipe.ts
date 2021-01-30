import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'angle'
})
export class AngleFormatPipe implements PipeTransform {
  transform(value: any, args?: any): string {

    return `${value}°`;
  }
}
