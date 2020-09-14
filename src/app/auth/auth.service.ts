import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import _ from "lodash";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "environments/environment";
import {
  LoginModel,
  LoginResponseModel,
  Permission as LoginPermisionModel,
} from "./login/login.model";
import { MenuItem } from "app/models/common.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginResponseModel>;
  public currentUser: Observable<LoginResponseModel>;

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  public getMenuItems = this.menuItemsSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.currentUserSubject = new BehaviorSubject<LoginResponseModel>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponseModel {
    return this.currentUserSubject.value;
  }

  login(loginDetail: LoginModel): Observable<LoginResponseModel> {
    return this.http
      .post<LoginResponseModel>(
        `${environment.baseUrl}admin/login`,
        loginDetail
      )
      .pipe(
        map((user: LoginResponseModel) => {
          sessionStorage.setItem("user", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  getPermission() {
    return this.http
      .get("../../assets/data/permission.json")
      .pipe(
        map((response) => {
          return this._createPermissionObject(response);
        })
      )
      .pipe(shareReplay(1));
  }

  _createPermissionObject(response) {
    const arr = [];
    response = _(response.data)
      .groupBy("module_name")
      .map(function (items, groupName) {
        return {
          groupName: _.head(items).group,
          title: groupName,
          path: "",
          icon: _.head(items).icon,
          children: [...items],
        };
      })
      .value();
    response.forEach((x) => {
      arr.push(this._sanitizeObject(x));
    });
    return arr;
  }

  _sanitizeObject(x) {
    const keys = x.children.map((child) => child.key);
    var obj = {
      path: `${_.head(x.children).template_route}`,
      title: x.title,
      icon: x.icon,
      groupName: x.groupName,
    };
    keys.forEach((key) => {
      obj[key] = true;
    });
    return obj;
  }

  setMenuItems() {
    let menuItems: MenuItem[] = [];
    this.getPermission().subscribe((res) => {
      var data = _(res)
        .groupBy("groupName")
        .map(function (items, groupName) {
          return {
            groupName,
            title: groupName,
            path: "",
            icon: _.head(items).icon,
            children: [...items],
          };
        })
        .value();
      data = _.orderBy(data, ["groupName"], ["desc"]);
      data.forEach((item) => {
        item.path = this._convertStringCase(item.path, "_");
      });
      this.menuItemsSubject.next(data);
    });
  }

  private _convertStringCase(name: string, caseType: string): string {
    let convertedArray = name.split("-");
    let convertedString = "";
    convertedArray.forEach((item, index) => {
      convertedString +=
        index !== convertedArray.length - 1
          ? item.toUpperCase() + caseType
          : item.toUpperCase();
    });
    return convertedString;
  }

  getToken(): string {
    return this.currentUserSubject.value
      ? this.currentUserSubject.value.token
      : null;
  }

  logout(): void {
    sessionStorage.removeItem("user");
    this.currentUserSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }

  apiResponse<T>(response: T): T {
    const object = _.get(response, "_body");
    return JSON.parse(object);
  }
}
