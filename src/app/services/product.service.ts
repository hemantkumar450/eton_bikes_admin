import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/models/product.model";
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

  getProductById(productId): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}admin/products/${productId}`
    );
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

  deleteProduct(productId): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}admin/products`);
  }
}
