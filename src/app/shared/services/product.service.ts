import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap } from "rxjs";
import { Product } from "src/app/models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products/products.json';


  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl).pipe(
      tap(data => console.log("All: ", JSON.stringify(data))),
      catchError(() => {
        //return []
        //return throwError(() => 'Ops, aconteceu alguma coisa')
        throw 'Ops, aconteceu alguma coisa'
      })
    )
  }

  getProduct(id: number) {
    return this.getProducts().pipe(map((products: Product[]) => {
      return products.find(p => p.id === id)
    }))
  }

}
