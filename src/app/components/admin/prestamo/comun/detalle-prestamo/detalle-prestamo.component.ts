import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Loan } from 'src/app/model/loan';

@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.scss']
})
export class DetallePrestamoComponent implements OnInit {

  @Input() loan:Loan=new Loan(); 
  @Output()  onProcesarClick:EventEmitter<void>=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  procesarPrestamo(){
    this.onProcesarClick.emit();
  }
}
