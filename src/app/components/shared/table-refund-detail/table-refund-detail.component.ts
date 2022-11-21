import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { LoanDetail } from 'src/app/model/loandetaily';
import { RefundDetail } from 'src/app/model/refund-detail';

@Component({
  selector: 'app-table-refund-detail',
  templateUrl: './table-refund-detail.component.html',
  styleUrls: ['./table-refund-detail.component.scss']
})
export class TableRefundDetailComponent implements OnInit {

  @Input() refundDetails:RefundDetail[]=[]; 
  @Input() buttons=[]; 
  @Output()  onClickButton:EventEmitter<any>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onClickButtonSelect(refundDetail:RefundDetail,btnAction:number){
    let rpta={
      obj:refundDetail,
      btnAction:btnAction
    }
    this.onClickButton.emit(rpta)
  }
}
