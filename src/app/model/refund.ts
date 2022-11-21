import { RefundDetail } from "./refund-detail";
import { Usuario } from "./usuarios";


export class Refund {
    id: number;
    employee:Usuario;
    refundedClient:Usuario;
    refundedDate:Date;
    observation:String;
    refundDetails:RefundDetail[]=[]

  }