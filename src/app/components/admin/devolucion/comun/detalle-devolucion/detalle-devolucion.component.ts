import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Refund } from 'src/app/model/refund';

@Component({
  selector: 'app-detalle-devolucion',
  templateUrl: './detalle-devolucion.component.html',
  styleUrls: ['./detalle-devolucion.component.scss']
})
export class DetalleDevolucionComponent implements OnInit {

  @Input() refund:Refund=new Refund(); 
  @Output()  onProcesarClick:EventEmitter<void>=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  procesar(){
    this.onProcesarClick.emit();
  }
}
