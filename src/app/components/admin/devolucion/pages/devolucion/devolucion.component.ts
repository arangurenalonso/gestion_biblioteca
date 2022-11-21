import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Refund } from 'src/app/model/refund';
import { RefundService } from 'src/app/services/refundService';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-gestion-visita',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.html']
})
export class DevolucionComponent implements OnInit {
  refund: Refund = new Refund()

  public isHabilitado: boolean = true


  isEditable = false;


  constructor(
    private refundService: RefundService,
    private router: Router,) { }

  async ngOnInit(): Promise<void> {

  }
 
  goForwardStep(stepper: MatStepper) {
    stepper.next();
  }

  procesarDevolucion() {
    Swal.fire({
      title: `Está seguro que desea procesar la devolución?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.refundService.registrar(this.refund)
          .subscribe(response => {
            console.log(response)

            this.router.navigate(['/admin/devolucion/listado'])
          });
      }
    })
  }
}  
