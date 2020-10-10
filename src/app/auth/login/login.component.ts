import { Component, OnInit, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginModel } from "./login.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private formBuilder: FormBuilder
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const login: LoginModel = {
      password: this.loginForm.get("password").value,
      email: this.loginForm.get("username").value,
    };

    this.authService.login(login).subscribe(() => {
      this.router.navigate([""]);
    });
  }

  signInEvent() {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  }

  signUpEvent() {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  }
}
