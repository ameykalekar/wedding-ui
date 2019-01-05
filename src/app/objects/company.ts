export class Company {
    companyname;
    ownername;
    address;
    mobilenumber;
    type;
    active;
    emailid;

    constructor(companyname: string,
        ownername: string,
        address: string,
        mobilenumber: string,
        type: string,

        emailid: string) {
        this.companyname = companyname,
            this.ownername = ownername,
            this.address = address,
            this.mobilenumber = mobilenumber,
            this.type = type,
            this.emailid = emailid;
    }

}
