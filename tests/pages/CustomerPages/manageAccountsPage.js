import { methods } from "../../utils/methods";

export class ManageAccountsPage {

    constructor(page){
        this.page = page;
        this.btn_manageAccounts = page.locator("[title='Add Account']");
    }

    async clickOn_ManageAccounts(){
        await methods.waitFor_and_Click(this.btn_manageAccounts);
    }
}