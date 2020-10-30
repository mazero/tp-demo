import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: object[] = [{
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipseum'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lorem ipseum'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Lorem ipseum'
  }];

  public array: number[] = [1,2,3,4];

  constructor() { }

  ngOnInit(): void {
  }

}
