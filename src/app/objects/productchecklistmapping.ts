export class ProductAndCheckListMapping {
    productId: string;
    checkListId: string;
    updateby: string;
    active: string;
    constructor(productid: string,
        checklistid: string, updateby: string) {
        this.productId = productid;
        this.checkListId = checklistid;
        this.updateby = updateby;
    }
}

