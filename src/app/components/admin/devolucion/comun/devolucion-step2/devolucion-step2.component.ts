import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Loan } from 'src/app/model/loan';
import { Refund } from 'src/app/model/refund';
import { Usuario } from 'src/app/model/usuarios';

@Component({
  selector: 'app-prestamo-step2',
  templateUrl: './devolucion-step2.component.html',
  styleUrls: ['./devolucion-step2.component.scss']
})
export class Step2DevolucionComponent implements OnInit {

  @Input() refund:Refund=new Refund();  
  constructor() { }

  async ngOnInit(): Promise<void> {}


  onUserChange(user:Usuario){
    this.refund.refundedClient=user
  }


}
