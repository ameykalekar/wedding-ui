export class PartProductMapping {
    productId: string;
    partId: string;
    updateby: string;
    active: string;
    constructor(productid: string,
        partId: string, updateby: string) {
        this.productId = productid;
        this.partId = partId;
        this.updateby = updateby;
    }
}
