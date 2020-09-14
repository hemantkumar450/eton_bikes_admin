import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(params): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}admin/customers`, {
      params: params,
    });
  }

  getUserById(user: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}admin/customer/${user}`);
  }

  saveUser(user: User): Observable<any> {
    if (user._id) {
      return this.http.put<any>(
        `${environment.baseUrl}admin/customers/${user._id}`,
        user
      );
    }
    return this.http.post<any>(`${environment.baseUrl}admin/customers`, user);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}admin/customers/delete/${user._id}`,
      user
    );
  }

  onToggleEvent(userId: string): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}admin/toggleCustomerStatus/${userId}`,
      {}
    );
  }

  uploadDocuments(doc) {
    return this.http.post(`${environment.baseUrl}admin/uploadDocuments`, doc);
  }

  getPaymentDetailByUser(userId) {
    return this.http.post<any>(
      `${environment.baseUrl}admin/customer/payments`,
      {
        userId,
      }
    );
  }

  downloadReport(userId) {
    return this.http.post<any>(
      `${environment.baseUrl}admin/customer/eligibilityReports`,
      { userId }
    );
  }

  onEmailVerification(email) {
    return this.http.post<any>(
      `${environment.baseUrl}v1/customer/resendEmailVerification`,
      { email }
    );
  }
}
