import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, Product } from './product';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

/* === C. R. U. D / CRUD ===
/ CREATE => save(); 
/ READ => fetch(); 
/ UPDATE => save(); 
/ DELETE
*/
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public httpOptions: object = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private products$: Observable<Product[]> = this._products.asObservable();

  constructor(public http: HttpClient) { 
    this.fetch();
    console.log('_products is ', this._products);
    console.log('products$ is ', this.products$);
  }

  public fetch(): void {
    // Create an observable from the get method of HttpClient service
    // wich will return a IProduct[] object
    this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
      map(products => products.map(product => new Product(product))),
      tap(products => console.log(`Products number: ${products.length}`))
    ).subscribe(
      products => this._products.next(products)
    )
  }

  public getProducts$(): Observable<IProduct[]> {
    return this.products$;
  }

  public getProductById$(id: number): Observable<Product> {
     return this.products$.pipe(
       map(products => products.find(product => product.id === id))
     )
  }

  public save(product: IProduct): Observable<IProduct> {
    if(product.id == null) {
      // we have to create the product (POST)
      return this.http.post<IProduct>('http://localhost:3000/products', 
                  product, this.httpOptions).pipe(
                    tap(product => console.log(`New product: ${product.id}`)),
                    tap(() => this.fetch())
                  )
    } else {
      // we have to update a product (PUT)
      return this.http.put<IProduct>(`http://localhost:3000/products/${product.id}`, 
                  product, this.httpOptions).pipe(
                    tap(product => console.log(`Edit product: ${product.id}`)),
                    tap(() => this.fetch())
                  )
    }
  }
}
