import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Refund } from 'src/app/model/refund';

@Component({
  selector: 'app-table-devolucion',
  templateUrl: './table-devolucion.component.html',
  styleUrls: ['./table-devolucion.component.scss']
})
export class TableDevolucionComponent implements OnInit {

  @Input() refunds:Refund[]=[]; 
  @Input() buttons=[]; 
  @Output()  onClickButton:EventEmitter<any>=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  onClickButtonSelect(refund:Refund,btnAction:number){
    let rpta={
      obj:refund,
      btnAction:btnAction
    }
    this.onClickButton.emit(rpta)
  }
}
