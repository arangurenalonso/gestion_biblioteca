import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Loan } from 'src/app/model/loan';
import { LoanService } from 'src/app/services/LoanService';
@Component({
  selector: 'view-form',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'] 
})
export class ViewComponent implements OnInit {
  
  @Input() loan:Loan=new Loan(); 

  constructor(
    private loanService: LoanService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarInformación()
  }

  public cargarInformación(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.loanService.findById(id).subscribe(
          response=>{
            console.log(response)
            this.loan=response.detalle.data
          }
        )
      }
    })  
  }

}
