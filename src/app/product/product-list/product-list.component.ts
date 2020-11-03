import { IProduct } from '../../shared/model/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/model/product.service';

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
  public products: IProduct[] = [];


  constructor(public productService: ProductService) { 
    this.products = productService.getProducts();
  }

  ngOnInit(): void {
    console.log('birthday', this.birthday);
  }

  public toggleImage(): void {
    this.displayImage = !this.displayImage;
  }

  public getFilteredProducts(): IProduct[] {
    const term: string = this.searchTerm.toLowerCase();
    return this.products.filter(product => {
      const name: string = product.productName.toLowerCase();
      return name.indexOf(term) > -1;
    });
  }

}
