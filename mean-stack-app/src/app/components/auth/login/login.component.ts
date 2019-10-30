import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/components/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginform: FormGroup;
  // constructor() { }
  constructor(
    public fbb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    // private apiService: ApiService
    private authService: AuthService
  ) {
    this.loginFrom();
  }

  ngOnInit() {
  }
  loginFrom() {
    this.loginform = this.fbb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }



  // Getter to access form control
  get myForm(){
    return this.loginform.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.loginform.valid) {
      return false;
    } else {
      console.log(this.loginform.value + 'hello');
      // this.authService.createUser(this.loginform.value).subscribe(
      //   (res) => {
      //     console.log('User successfully created!')
      //     this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      //   }, (error) => {
      //     console.log(error);
      //   });
      this.authService.login(this.loginform.value);
    }
  }

}
