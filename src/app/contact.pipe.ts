import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contact'
})
export class ContactPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
