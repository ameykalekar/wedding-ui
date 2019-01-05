export class Userinfo {
    username: string;
    firstname: string;
    lastname: string;
    address: string;
    mobilenumber: string;
    type: string;
    active: string;
    companyid: string;

    constructor(username: string,
        firstname: string,
        lastname: string,
        address: string,
        mobilenumber: string,
        type: string,
        active: string,
        companyid: string) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.mobilenumber = mobilenumber;
        this.type = type;
        this.active = active;
        this.companyid = companyid;
    }

}
