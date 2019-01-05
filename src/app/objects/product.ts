export class Product {
    productName;
    productBrand;
    productType;
    category;
    subCategory;
    active;
    companyid;
    comments;
    id;

    constructor(productName: string, productBrand: string, productType: string, category: string,
        subCategory: string, comments: string, active: string, companyid: string) {
        this.productName = productName;
        this.productBrand = productBrand;
        this.productType = productType;
        this.category = category;
        this.subCategory = subCategory;
        this.comments = comments;
        this.active = active;
        this.companyid = companyid;

    }

    setActive(active: string) {
        this.active = active;
    }

    setCompanyId(companyid: string) {
        this.companyid = companyid;
    }

}
