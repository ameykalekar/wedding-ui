export class BarcodePartMapping {
    barcodeid: string;
    partId: string;
    updateby: string;
    active: string;
    constructor(barcodeid: string,
        partId: string, updateby: string) {
        this.barcodeid = barcodeid;
        this.partId = partId;
        this.updateby = updateby;
    }
}
