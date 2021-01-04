import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "app/models/api-response.model";
import { SubProduct } from "app/models/sub-product.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubProductService {
  constructor(private http: HttpClient) {}

  getSubProducts(params): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.baseUrl}admin/subProducts`,
      {
        params: params,
      }
    );
  }

  getSubProductById(productId): Observable<{ data: SubProduct }> {
    return this.http.get<{ data: SubProduct }>(
      `${environment.baseUrl}admin/subProducts/${productId}`
    );
  }

  saveSubProduct(product: SubProduct): Observable<{ data: SubProduct }> {
    if (product._id) {
      return this.http.put<{ data: SubProduct }>(
        `${environment.baseUrl}admin/subProducts/${product._id}`,
        product
      );
    }
    return this.http.post<{ data: SubProduct }>(
      `${environment.baseUrl}admin/subProducts`,
      product
    );
  }

  deleteSubProduct(subProductId: string): Observable<SubProduct> {
    return this.http.delete<SubProduct>(
      `${environment.baseUrl}admin/subProducts/${subProductId}`
    );
  }
}
