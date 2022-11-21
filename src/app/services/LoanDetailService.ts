import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Book } from '../model/book';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ 
  providedIn: 'root'
})
export class LoanDetailService {

  public urlEndPoint: string = environment.apiUrl + "/api/user";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,  private authService: AuthService) { }

  async findByUserDNI(usedDNI): Promise<any> {
    return await  firstValueFrom(this.http.get(`${this.urlEndPoint}/${usedDNI}/loandetail`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
          timer: 6000
        })        
        return throwError(e);
      })
    ));
  }

}