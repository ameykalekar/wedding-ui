import { Task } from "./task";

export class CheckList {
    checkListName;
    checkListId;
    active;
    companyId;
    comments;
    tasks: Task[];

    constructor(checkListName: string, comments: string, active: string, companyid: string) {
        this.checkListName = checkListName;

        this.comments = comments;
        this.active = active;
        this.companyId = companyid;

    }

    setActive(active: string) {
        this.active = active;
    }

    setCompanyId(companyid: string) {
        this.companyId = companyid;
    }

}
