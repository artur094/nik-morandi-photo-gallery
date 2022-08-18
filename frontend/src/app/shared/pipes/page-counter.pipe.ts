import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageCounter',
})
export class PageCounterPipe implements PipeTransform {
  transform(value: number, size: number): unknown {
    return Math.ceil(value / size);
  }
}
