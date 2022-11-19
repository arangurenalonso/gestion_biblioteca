import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuarios';
import { NotificationType } from 'src/app/enum/notification-type.enum';

import swal from 'sweetalert2';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,) {
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/admin/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  async onLogin() {
    console.log(this.usuario)
    if (this.usuario.email == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.showLoading = true;
    await this.authService.login(this.usuario).subscribe(
      async response => {
        let objPayload = JSON.parse(atob(response.tokens.accessToken.split(".")[1]))
        console.log("roles-" + objPayload.roles)
        console.log("username-" + objPayload.iss)
        console.log("tiempo de Inicio del Token-" + new Date(objPayload.iat * 1000))
        console.log("tiempo de expiracion-" + new Date(objPayload.exp * 1000))
        console.log("Id-" + objPayload.userId)
        
        this.authService.guardarToken(response.tokens.accessToken);

        await this.userService.findById(objPayload.userId).subscribe(
          response => {
            let _usuario = (response.detalle.data as Usuario);
            this.authService.guardarUsuario(_usuario);
          });
        let usuarioConectado=this.authService.usuario

        swal.fire('Login', `Hola ${usuarioConectado.person.name} ${usuarioConectado.person.surname}, has iniciado sesión con éxito!`, 'success');
        this.showLoading = false;
        this.router.navigateByUrl('/admin/');
      },
      err => {
          if(err.status==400){
            console.log(err)
            this.sendErrorNotification(NotificationType.ERROR, err.error.detalle.mensaje)
            swal.fire('Login',err.error.detalle.mensaje, 'error');
            this.showLoading = false;
          }
      })
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
