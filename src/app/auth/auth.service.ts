import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private userSrv: UserService, private jwtHelper: JwtHelperService) {}

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
      console.log(decodedToken['role']);
      return decodedToken['role']; // Recupera il ruolo dal token decodificato
    }
    return null;
  }

  register(
    username: String,
    name: String,
    surname: string,
    email: string,
    password: string
  ): Observable<any> {
    const newUser = { email, password, name, surname, username };
    return this.http.post<any>('http://localhost:3001/auth/register', newUser);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http
      .post<any>('http://localhost:3001/auth/login', credentials)
      .pipe(
        map((response) => {
          console.log('Server Response:', response);
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
          }
          return response;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    return this.http.post<any>('http://localhost:3001/auth/logout', null);
  }

}
