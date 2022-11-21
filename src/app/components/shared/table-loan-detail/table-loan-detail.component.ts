import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { LoanDetail } from 'src/app/model/loandetaily';

@Component({
  selector: 'app-table-loan-detail',
  templateUrl: './table-loan-detail.component.html',
  styleUrls: ['./table-loan-detail.component.scss']
})
export class TableLoanDetailComponent implements OnInit {

  @Input() loanDetails:LoanDetail[]=[]; 
  @Input() buttons=[]; 
  @Output()  onClickButton:EventEmitter<any>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onClickButtonSelect(loanDetail:LoanDetail,btnAction:number){
    let rpta={
      obj:loanDetail,
      btnAction:btnAction
    }
    this.onClickButton.emit(rpta)
  }
}
