import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {

  private urlClienti = 'http://localhost:3001/clienti';

  constructor(private http: HttpClient) { }

  // getClienti(page: number, order: string): Observable<Clienti[]> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('order', order);

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   });

  //   return this.http.get<any>(this.urlClienti, { params, headers })
  //     .pipe(map(response => response.content));
  // }



  // getProvinciaById(provincia: string): Observable<Clienti> {
  //   const url = `${this.urlClienti}/${provincia}`;
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.http.get<Clienti>(url, { headers });
  // }



// creaCliente(cliente: Clienti): Observable<Clienti> {
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`
//   });
//   return this.http.post<Clienti>(this.urlClienti, cliente, { headers });
// }
}
