import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Loan } from 'src/app/model/loan';
import { LoanService } from 'src/app/services/LoanService';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-gestion-visita',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.html']
})
export class PrestamoComponent implements OnInit {
  loan: Loan = new Loan()

  public isHabilitado: boolean = true


  isEditable = false;
  constructor(
    private loanService: LoanService,
    private router: Router,) { }

  async ngOnInit(): Promise<void> {

  }

 
  goForwardStep(stepper: MatStepper) {
    stepper.next();
  }

  procesarPrestamo() {
    Swal.fire({
      title: `Está seguro que desea procesar el prestamo al Cliente ${this.loan.client.person.name} ${this.loan.client.person.surname}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("this.loan",this.loan);
        
        this.loanService.registrar(this.loan)
          .subscribe(response => {
            console.log(response)

            this.router.navigate(['/admin/prestamo/listado'])
          });
      }
    })
  }
}  
