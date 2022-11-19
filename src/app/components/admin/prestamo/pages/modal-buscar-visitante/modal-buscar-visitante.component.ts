import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/model/roles';
import { Usuario } from 'src/app/model/usuarios';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/userService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-buscar-visitante',
  templateUrl: './modal-buscar-visitante.component.html',
  styleUrls: ['./modal-buscar-visitante.component.scss']
})
export class ModalBuscarVisitanteComponent implements OnInit {
  entityName:String="Cliente"
  public user: Usuario = new Usuario()
  public titulo: String = `Regitro ${this.entityName}`
  public errores: any

  
  constructor(
    public modalService:ModalService,
    private userService: UserService
    ) { }

  ngOnInit(): void {

  }
  buscarVisitante() {

  }

  cerrarModal() {
    this.modalService.cerrarModalBuscarVisitante(null)
    
  }
  public create(): void {
    console.log("this.generatePassword",this.generatePassword(10));
    this.user.password=this.generatePassword(16)
    let roleCustomer=new Role()
    roleCustomer.id=2
    roleCustomer.name="ROLE_CUSTOMER"
    this.user.roles.push(roleCustomer)
    console.log("user",this.user);
    

    this.userService.registrar(this.user)
      .subscribe(response => {
        console.log("response!")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.detalle.data.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        console.log("cliente registrado exitosamente",response);        
        this.modalService.cerrarModalBuscarVisitante(response.detalle.data)
      },
        err => {
          this.errores=err.error.detalle.data
        }
      )
  }
  
  generatePassword(passwordLength) {
    let numberChars = "0123456789";
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";    
    let specialCharacter = "@#&?+$-/";
    let allChars = numberChars + upperChars + lowerChars;
    let randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray[3] = specialCharacter;
    randPasswordArray = randPasswordArray.fill(allChars, 4);
    return this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }
  
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

}
