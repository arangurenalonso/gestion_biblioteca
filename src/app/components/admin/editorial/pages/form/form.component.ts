import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/dto/Respuesta';
import { Editorial } from 'src/app/model/editorial';
import { EditorialService } from 'src/app/services/editorialService';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  entityName:String="Editorial"
  public editorial: Editorial = new Editorial()
  public titulo: String = `Regitro ${this.entityName}`
  public errores: any
  constructor(private editorialService: EditorialService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.cargarInformación()
  }

  public cargarInformación(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.editorialService.findById(id).subscribe(
          response=>{
            console.log(response)
            this.editorial=response.detalle.data
          }
        )
        this.titulo =`Editar ${this.entityName}` 
      }
    }) 
  }
  public create(): void {
    
    this.editorialService.registrar(this.editorial)
      .subscribe(response => {
        console.log("response!")
        swal.fire({
          position: 'center',
          icon: 'success',
          title: response.detalle.data.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/editorial/listado'])
      },
        err => {
          let respuesta:Respuesta=err.error
          this.errores=respuesta.detalle.data
        }
      )
  }
  
  public update(): void {
    this.editorialService.actualizar(this.editorial).subscribe(
      response => {
        this.router.navigate(['/admin/editorial/listado'])
        swal.fire({

          position: 'center',
          icon: 'success',
          title: `${response.reason} -> Id: ${response.detalle.data.id}`,
          showConfirmButton: false,
          timer: 2500
        })

      },
      err => {
        let respuesta:Respuesta=err.error
        this.errores=respuesta.detalle.data
        
      }
    )
  }

}
