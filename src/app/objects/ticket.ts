import { ProductInfo } from "./productInfo";

export class Ticket {
    createdBy: string;
    description: string;
    deviceLocation: string;
    deviceId: string;
    status: string;
    estimate: number;
    assignedTo:string="";
    createdAt:string="";
    id:number; 

    productInfo: ProductInfo[];

   
    constructor(CREATEDBY: string, DESCRIPTION: string, DEVICELOCATION: string, DEVICEID: string,status:string) {
        this.createdBy = CREATEDBY;
        this.description = DESCRIPTION;
        this.deviceLocation = DEVICELOCATION;
        this.deviceId = DEVICEID;
        this.status = status;
    }

    
}
