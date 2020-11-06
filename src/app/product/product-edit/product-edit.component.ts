import { Observable, Subscription } from 'rxjs';
import { map, filter, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../shared/model/product.service';
import { IProduct, Product } from './../../shared/model/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

const HTTP_URL_PATTERN: string = 
    '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  public productForm: FormGroup;
  // this is used to store subscription in order to clean it with the compoent
  private productSubscription: Subscription;

  constructor(fb: FormBuilder, route: ActivatedRoute, public productService: ProductService) { 
    // We create our form for product
    this.productForm = fb.group({
      id: [null], // ===> It is the sams as "id:" new Control(null)
      productName: [
        '', // default value
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80)
        ]
      ],
      productCode: [''],
      releaseDate: [new Date()],
      description: [''],
      price: [0, Validators.min(0)],
      starRating: [3, [Validators.min(0), Validators.max(5)]],
      imageUrl: ['', Validators.pattern(HTTP_URL_PATTERN)]
    })

    let currentId$: Observable<number> = route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => Number(id))
    )

    this.productSubscription = currentId$.pipe(
      switchMap(id => productService.getProductById$(id)),
      filter(product => product instanceof Product)
    ).subscribe(product => this.productForm.setValue(product))
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  public onSubmit(): void {
    let data: IProduct = this.productForm.value;
    if(this.productForm.valid) {
      this.productService.save(data).subscribe(
        product => console.log(`My product was saved ${product.id}` )
      );
    }
  }

}
