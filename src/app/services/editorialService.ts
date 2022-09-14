import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { ServicioDTO } from '../dto/ServicioDTO';
import { Servicio } from '../model/servicio';
import { IncidenteDTO } from '../dto/IncidenteDTO';
import { Incidente } from '../model/Incidente';
import { Editorial } from '../model/editorial';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ 
  providedIn: 'root'
})
export class EditorialService {

  public urlEndPoint: string = environment.apiUrl + "/api/editorial";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,  private authService: AuthService) { }

  page(filtroURL:string): Observable<any> {
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
  async all(): Promise<any> {
    return await firstValueFrom( this.http.get(this.urlEndPoint , { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
    )); 
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

  registrar(editorial: Editorial): Observable<any> {
    return this.http.post(this.urlEndPoint, editorial, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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

  actualizar(editorial: Editorial): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${editorial.id}`, editorial, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) }).pipe(
      catchError(e => {
        console.log(e);
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }        
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(editorial: Editorial): Observable<any> {

    return this.http.delete(this.urlEndPoint+`/${editorial.id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

      .pipe(
       
        catchError(e => {
          console.log(e);
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