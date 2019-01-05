import { ProductInfo } from "./productInfo";
import { Ticket } from "./ticket";

export class TicketInfo {
    ticket: Ticket = new Ticket("","","","","");
    productInfos: ProductInfo[];
    formattedStartScheduledTime:string;
    formattedEndScheduledTime:string;



}