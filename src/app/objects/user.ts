import { Userinfo } from "./userinfo";


export class User {

    constructor(username: string, password: string, role: string, companyid: string, functions: string[]) {
        this.username = username;
        this.role = role;
        this.companyId = companyid;
        this.functions = functions;
        this.password = password;
    }


    username: string;
    password: string;
    role: string;
    companyId: string;
    functions: string[];
    userinfo: Userinfo;
}
