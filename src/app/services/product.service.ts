import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/models/product";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(params): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}admin/products`, {
      params: params,
    });
  }

  saveProduct(product: Product): Observable<any> {
    if (product._id) {
      return this.http.put<any>(
        `${environment.baseUrl}admin/products/${product._id}`,
        product
      );
    }
    return this.http.post<any>(`${environment.baseUrl}admin/products`, product);
  }
}
