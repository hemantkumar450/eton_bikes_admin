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

  getKeyByType(category): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}admin/keys/${category}`
    );
  }

  saveKey(key: KeyModel): Observable<KeyModel> {
    if (key._id) {
      return this.http.put<KeyModel>(
        `${environment.baseUrl}admin/keys/${key._id}`,
        key
      );
    }
    return this.http.post<KeyModel>(`${environment.baseUrl}admin/keys`, key);
  }

  toggleKey(keyId): Observable<KeyModel> {
    return this.http.post<KeyModel>(`${environment.baseUrl}admin/keys`, keyId);
  }

  deleteKey(keyId): Observable<KeyModel> {
    return this.http.delete<KeyModel>(
      `${environment.baseUrl}admin/keys/${keyId}`
    );
  }
}
