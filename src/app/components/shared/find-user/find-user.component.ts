import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { Usuario } from 'src/app/model/usuarios';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit {
  
  @Output()  onUserChange:EventEmitter<Usuario>=new EventEmitter()
  @Input() title:String=""

  public usuario:Usuario
  public filtro: string = ''
  constructor(
    public modalService: ModalService,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.escucharCierreModalVisitante()
  }
  escucharCierreModalVisitante() {

    this.modalService.notificarCerrarModalBuscarVisitante.subscribe((usuario) => {
      if (usuario) {
        this.usuario=usuario
        this.filtro = usuario?.person?.dni
        this.onUserChange.emit(this.usuario)
      }
    })
  }
  
  abrirModalCrearCliente() {
    this.modalService.abrirModalBuscarVisitante()
  }
  buscarCliente() {
    if (this.filtro.length == 8) {
      let filtroURL = `/search?dni=${this.filtro}`
      this.userService.find(filtroURL)
        .subscribe(response => {
          this.usuario = response.detalle.data as Usuario;
          this.onUserChange.emit(this.usuario)
        });
    }
  }
  borrarCliente() {
    this.usuario = null
    this.onUserChange.emit(this.usuario)
  }
}
