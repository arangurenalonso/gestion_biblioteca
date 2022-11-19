import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/services/authorService';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'] 
})
export class FormComponent implements OnInit {
  entityName:String="Author"
  public author: Author = new Author()
  public titulo: String = `Regitro ${this.entityName}`
  public errores: any
  constructor(private authorService: AuthorService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarInformación()
  }

  public cargarInformación(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.authorService.findById(id).subscribe(
          response=>{
            console.log(response)
            this.author=response.detalle.data
          }
        )
        this.titulo =`Editar ${this.entityName}` 
      }
    })  
  }
  public create(): void {
    
    this.authorService.registrar(this.author)
      .subscribe(response => {
        console.log("response!")
        swal.fire({
          position: 'center',
          icon: 'success',
          title: response.detalle.data.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/author/listado'])
      },
        err => {
          console.log(err);
          
          let respuesta=err.error
          this.errores=respuesta.detalle.data
        }
      )
  }
  
  public update(): void {
    this.authorService.actualizar(this.author).subscribe(
      response => {
        this.router.navigate(['/admin/author/listado'])
        swal.fire({

          position: 'center',
          icon: 'success',
          title: `${response.reason} -> Id: ${response.detalle.data.id}`,
          showConfirmButton: false,
          timer: 2500
        })

      },
      err => {
        let respuesta=err.error
        this.errores=respuesta.detalle.data
        
      }
    )
  }

}
