import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Author } from '../model/author';
import { Usuario } from '../model/usuarios';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ 
  providedIn: 'root'
})
export class UserService {

  public urlEndPoint: string = environment.apiUrl + "/api/user";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,  private authService: AuthService) { }

  find(filtroURL:string): Observable<any> {
    return this.http.get(this.urlEndPoint+filtroURL , { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire({

          position: 'center',
          
          title: `${e.error.reason} `,
          icon: 'error',
          text: `${e.error.detalle.mensaje} `,
          showConfirmButton: false,
          timer: 2500
        })
        return throwError(e);
      })
    ); 
  }

  findById(id): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) }).pipe(
      
      catchError(e => {
        console.log(e)
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire({
          position: 'center',
          title: `${e.error.reason} `,
          icon: 'error',
          text: `${e.error.detalle.mensaje} `,
          showConfirmButton: false,
          timer: 2500
        })        
        return throwError(e);
      })
    );
  }

  registrar(user: Usuario): Observable<any> {
    return this.http.post(this.urlEndPoint, user, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
      .pipe(
        catchError(e => {
          console.log(e)
          if (this.authService.isNoAutorizado(e)) {
            return throwError(e);
          }
          Swal.fire({
            position: 'center',
            title: `${e.error.reason} `,
            icon: 'error',
            text: `${e.error.detalle.mensaje} `,
            showConfirmButton: false,
            timer: 2500
          })         
          return throwError(e);
        })
       
      );
  }

}