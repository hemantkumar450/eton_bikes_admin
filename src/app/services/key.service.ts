import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeyModel } from "app/models/key.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class KeyService {
  constructor(private http: HttpClient) {}

  getKeys(params): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}admin/keys`, {
      params: params,
    });
  }

  saveKey(key: KeyModel): Observable<any> {
    if (key._id) {
      return this.http.put<any>(
        `${environment.baseUrl}admin/keys/${key._id}`,
        key
      );
    }
    return this.http.post<any>(`${environment.baseUrl}admin/keys`, key);
  }

  toggleKey(keyId): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}admin/keys`, keyId);
  }

  deleteKey(keyId): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}admin/keys/${keyId}`);
  }
}
