import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  signupform: FormGroup;
  // constructor() { }
  constructor(
    public fbb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.signupForm();
  }
  ngOnInit() {
  }
  signupForm() {
    this.signupform = this.fbb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }



  // Getter to access form control
  get myForm(){
    return this.signupform.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.signupform.valid) {
      return false;
    } else {
      console.log(this.signupform.value + 'hello');
      this.authService.createUser(this.signupform.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
