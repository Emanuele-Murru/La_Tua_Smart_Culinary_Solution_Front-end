import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:3001/user';

  constructor(private http: HttpClient) { }

  getUserData(userId: string): Observable <any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  getCurrentUserData(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/user/current');
  }

  updateUserData(userId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, data);
  }


}
