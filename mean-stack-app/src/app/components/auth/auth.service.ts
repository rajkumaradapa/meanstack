import { Injectable, NgZone } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  // Create User
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/createUser`;
    const authData: AuthData = {email: data.email, password: data.password};
    return this.http.post(url, authData)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  login(data) {
    console.log(data);
    let url2 = `${this.baseUri}/login`;
    const authData: AuthData = {email: data.email, password: data.password};
    return this.http.post<{token: string}>( url2, authData).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
      this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
      console.log(response);
      this.authStatusListener.next(true);
      }

    })

  }
  logout() {
    this.token = null;
    this.authStatusListener.next(false);
    this.ngZone.run(() => this.router.navigateByUrl('/login'));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
