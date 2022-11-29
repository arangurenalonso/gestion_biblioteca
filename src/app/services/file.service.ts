
import {EventEmitter,Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FileService {
    public urlEndPoint: string = environment.apiUrl + "/api/public/img";
    private httpHeaders = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    private _notificarUploadFoto=new EventEmitter<any>();
    get notificarUploadFoto():EventEmitter<any>{
        return this._notificarUploadFoto
      }
      
    
    async subirFoto(archivo: File): Promise<any> {

        const formData = new FormData();
        formData.append("file", archivo);
        
        
        return await firstValueFrom (this.http.post(this.urlEndPoint, formData, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
                    console.log(e)
                    return throwError(e);
                })
            ));

    }



}

