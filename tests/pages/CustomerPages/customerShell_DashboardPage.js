import { methods } from "../../utils/methods";

export class customerShell_DashboardPage{
    constructor(page){
        this.page = page;
        this.ln_dashboard = page.getByRole("link", { name : "Dashboard"});
        this.ln_properties = page.getByRole("link", { name : "Properties"});
        this.ln_documents = page.getByRole("link", { name : "Documents"});
        this.ln_transactions = page.getByRole("link", { name : "Transactions"});
        this.ln_manage_accounts = page.getByRole("link", { name : "Manage Accounts"});
        this.ln_contact_manager = page.getByRole("link", { name : "Contact Manager"});
        this.ln_myProfile = page.getByRole("link", { name : "My Profile"});
        this.btn_schedule = page.locator("#zydLUWmz9HKLxtYoyKIyS");
        this.ln_logout = page.getByRole("Link",{ name : "Logout" });
        this.btn_exploreProperties = page.getByRole("button", { nmae : "Explore Properties"});
        this.txt_dashboard = page.getByText("You have no project here");
    }

    async clickOn_Dashboard(){
        await methods.waitFor_and_Click(this.ln_dashboard);
    }

    async clickOn_properties(){
        await methods.waitFor_and_Click(this.ln_properties);
    }
 
    async clickOn_documents(){
        await methods.waitFor_and_Click(this.ln_documents);
    }

    async clickOn_transactions(){
        await methods.waitFor_and_Click(this.ln_transactions);
    }

    async clickOn_manage_accounts(){
        await methods.waitFor_and_Click(this.ln_manage_accounts);
    }

    async clickOn_contact_manager(){
        await methods.waitFor_and_Click(this.ln_contact_manager);   
    }

    async clickOn_myProfile(){
        await methods.waitFor_and_Click(this.ln_myProfile);
    }

    async clickOn_schedule(){
        await methods.waitFor_and_Click(this.btn_schedule);
    }

    async clickOn_logout(){
        await methods.waitFor_and_Click(this.ln_logout);
    }

    async clickOn_exploreProperties(){
        await methods.waitFor_and_Click(this.btn_exploreProperties);
    }

    async verify_dashboard(){
        return await methods.validateText(this.page, "You have no project here");
    }
}