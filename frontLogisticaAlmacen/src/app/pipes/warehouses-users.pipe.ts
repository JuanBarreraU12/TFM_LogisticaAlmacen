import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'warehousesUsers'
})
export class WarehousesUsersPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
