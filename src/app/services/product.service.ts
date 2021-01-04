import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "app/models/api-response.model";
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

  getProductById(productId): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(
      `${environment.baseUrl}admin/products/${productId}`
    );
  }

  saveProduct(product: Product): Observable<Product> {
    if (product._id) {
      return this.http.put<Product>(
        `${environment.baseUrl}admin/products/${product._id}`,
        product
      );
    }
    return this.http.post<Product>(
      `${environment.baseUrl}admin/products`,
      product
    );
  }

  deleteProduct(productId): Observable<Product> {
    return this.http.delete<Product>(
      `${environment.baseUrl}admin/products/${productId}`
    );
  }
}
