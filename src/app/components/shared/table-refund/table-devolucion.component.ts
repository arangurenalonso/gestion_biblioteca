import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Refund } from 'src/app/model/refund';

@Component({
  selector: 'app-table-devolucion',
  templateUrl: './table-devolucion.component.html',
  styleUrls: ['./table-devolucion.component.scss']
})
export class TableDevolucionComponent implements OnInit {

  @Input() refunds:Refund[]=[]; 

  constructor() { }

  ngOnInit(): void {
  }
  delete(refund:Refund){}
}
