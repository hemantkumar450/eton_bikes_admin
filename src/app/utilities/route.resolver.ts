import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AuthService } from "app/auth/auth.service";
import { compact, head } from "lodash";
import { Observable } from "rxjs/Observable";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RouteResolver implements Resolve<Observable<any>> {
  _data$: Observable<any>;
  constructor(private authService: AuthService) {
    this._data$ = this.authService.getPermission();
  }

  resolve(route: ActivatedRouteSnapshot) {
    const routeValue: any = route;
    const urls = routeValue._routerState.url.split("/");
    return this._data$
      .pipe(
        map(x => {
          return this.responseData(x, urls);
        })
      )
      .pipe(shareReplay(1));
  }

  responseData(data, urls) {
    const url = head(compact(urls));
    return data.find(x => x.path.split("/")[1] === url);
  }
}
