export class Part {

    id;
    partName;
    partBrand;
    partType;
    category;
    subCategory;
    companyid;
    price;
    comments;

    constructor(productName: string, productBrand: string, productType: string, category: string,
        subCategory: string, comments: string, price: string, companyid: string) {
        this.partName = productName;
        this.partBrand = productBrand;
        this.partType = productType;
        this.category = category;
        this.subCategory = subCategory;
        this.comments = comments;
        this.companyid = companyid;
        this.price = price;

    }

}
