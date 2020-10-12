import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "app/models/api-response.model";
import { PageModel } from "app/models/page.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PageService {
  constructor(private http: HttpClient) {}

  getPages(params): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}admin/pages`, {
      params: params,
    });
  }

  getPageById(pageId): Observable<ApiResponse<PageModel>> {
    return this.http.get<ApiResponse<PageModel>>(
      `${environment.baseUrl}admin/pages/${pageId}`
    );
  }

  savePage(pageModel: PageModel): Observable<PageModel> {
    if (pageModel._id) {
      return this.http.put<PageModel>(
        `${environment.baseUrl}admin/pages/${pageModel._id}`,
        PageModel
      );
    }
    return this.http.post<PageModel>(
      `${environment.baseUrl}admin/pages`,
      PageModel
    );
  }

  deletePage(pageId): Observable<PageModel> {
    return this.http.delete<PageModel>(`${environment.baseUrl}admin/pages`);
  }
}
