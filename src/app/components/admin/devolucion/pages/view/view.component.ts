import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Refund } from 'src/app/model/refund';
import { RefundService } from 'src/app/services/refundService';
@Component({
  selector: 'view-form',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'] 
})
export class ViewComponent implements OnInit {
  
  @Input() refund:Refund=new Refund(); 

  constructor(
    private refundService: RefundService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarInformación()
  }

  public cargarInformación(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.refundService.findById(id).subscribe(
          response=>{
            console.log(response)
            this.refund=response.detalle.data
          }
        )
      }
    })  
  }

}
