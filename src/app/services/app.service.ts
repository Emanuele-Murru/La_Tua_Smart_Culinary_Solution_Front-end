import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clienti } from '../models/clienti.interface';
import { map } from 'rxjs';
import { Fattura } from '../models/fattura.interface';
@Injectable({
  providedIn: 'root',
})
export class AppService {

  private urlClienti = 'http://localhost:3001/clienti'; // Controlla l'URL del backend

  constructor(private http: HttpClient) { }

  getClienti(page: number, order: string): Observable<Clienti[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('order', order);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(this.urlClienti, { params, headers })
      .pipe(map(response => response.content));
  }



  getProvinciaById(provincia: string): Observable<Clienti> {
    const url = `${this.urlClienti}/${provincia}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Clienti>(url, { headers });
  }



creaCliente(cliente: Clienti): Observable<Clienti> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.post<Clienti>(this.urlClienti, cliente, { headers });
}

// ------------------------------------------------------ Fattura

private urlFattura = 'http://localhost:3001/fattura';

creaFattura(fattura: Fattura): Observable<Fattura>{
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.post<Fattura>(this.urlFattura, fattura, { headers });
 }

 getFatture(page: number, order: string): Observable<Fattura[]> {
   const params = new HttpParams()
   .set('page', page.toString())
   .set('order', order);

   const headers = new HttpHeaders({
     Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(page, order);

    return this.http.get<any>(this.urlFattura, { params, headers })
    .pipe(map(response => response.content));
  }

  getFatturaById(fattura: string): Observable<Fattura> {
    const url = `${this.urlFattura}/${fattura}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Fattura>(url, { headers });
  }

}
//   //CHIAMATA POST PER METTERE FILM NEI PREFERITI
//   aggiungiFavorites(data: Favorites) {
//     return this.http.post<Favorites>('http://localhost:4201/favorites', data);
//   }
//   // CHIAMATA DELETE PER ELEMINARE FILM DAI PREFERITI
//   eliminaFavorites(favoriteID: number) {
//     return this.http.delete(`http://localhost:4201/favorites/${favoriteID}`);
//   }
// //CHIAMATA GET PER INFO FILM SPECIFICO
//   getFilmById(id: number) {
//     return this.http.get<Movies[]>(`http://localhost:4201/movies-popular/${id}`);
//   }



