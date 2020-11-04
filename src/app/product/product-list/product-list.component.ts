import { IProduct } from '../../shared/model/product';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ProductService } from '../../shared/model/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public birthday: Date = new Date(1988, 3, 15); 
  public a: number = 0.259;
  public searchTerm: string = '';
  public displayImage: boolean = true;
  public products$: Observable<IProduct[]>;


  constructor(private productService: ProductService) { 
    this.products$ = this.productService.getProducts$();
  }

  ngOnInit(): void {
    console.log('birthday', this.birthday);
  }

  public toggleImage(): void {
    this.displayImage = !this.displayImage;
  }

  public refreshProducts(): void {
    this.productService.fetch();
  } 

}
