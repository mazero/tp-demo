import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './product-list/product-list.component';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: IProduct[], term: string[]): IProduct[] {
    if(Array.isArray(value)) {
      /* return .... */
    } else {
      console.error('Given value must be an array!');
      return [];
    }
  }

}
