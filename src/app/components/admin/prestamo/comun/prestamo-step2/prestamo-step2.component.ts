import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Loan } from 'src/app/model/loan';
import { Usuario } from 'src/app/model/usuarios';

@Component({
  selector: 'app-prestamo-step2',
  templateUrl: './prestamo-step2.component.html',
  styleUrls: ['./prestamo-step2.component.scss']
})
export class Step2PrestamoComponent implements OnInit {

  @Input() loan:Loan=new Loan();  
  constructor() { }

  async ngOnInit(): Promise<void> {}

  myFilter = (d: Date | null): boolean => {
    return d >= new Date();
  };
 

  onUserChange(user:Usuario){
    this.loan.client=user
  }


}
