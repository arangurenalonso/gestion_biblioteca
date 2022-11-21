import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-table-book',
  templateUrl: './table-book.component.html',
  styleUrls: ['./table-book.component.scss']
})
export class TableBookComponent implements OnInit {

  @Input() books:Book[]=[]; 
  @Input() buttons=[]; 
  @Input() showStock=true;
  @Input() showBorrowedStock=true;
  @Output()  onClickButton:EventEmitter<any>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onClickButtonSelect(book:Book,btnAction:number){
    let rpta={
      book:book,
      btnAction:btnAction
    }
    this.onClickButton.emit(rpta)
  }
}
