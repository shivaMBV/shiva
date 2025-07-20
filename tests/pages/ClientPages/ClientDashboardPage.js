import { methods } from "../../utils/methods";

export class ClientDashboard{
    
    constructor(page){
        this.page = page;
        this.ln_dashboard = page.getByRole("link", { name : "Dashboard"});
        this.ln_bookings = page.getByRole("link", { name : "Bookings"});
        this.ln_addCustomer = page.getByRole("link", { name : "Add Customer"});
        this.ln_allCustomer = page.getByRole("link", { name : "All Customer"});
        this.ln_settings = page.getByRole("link", { name : "Settings"});
        this.ln_callSchedulings = page.getByRole("link", { name : "Call Schedulings"});
        this.ln_logout = page.getByRole("link", { name : "Logout"});
        this.ln_myProfile = page.getByRole("link", { name : "My Profile"});
        this.btn_addProject = page.locator("[title='Add project']");
    }

    async clickOn_dsashboard(){
        await methods.waitFor_and_Click(this.ln_dashboard);
    }

    async clickOn_bookings(){
        await methods.waitFor_and_Click(this.ln_bookings);
    }

    async clickOn_addCustomer(){
        await methods.waitFor_and_Click(this.ln_addCustomer);
    }

    async clickOn_allCustomer(){
        await methods.waitFor_and_Click(this.ln_allCustomer);
    }

    async clickOn_settings(){
        await methods.waitFor_and_Click(this.ln_settings);
    }

    async clickOn_callSchedulings(){
        await methods.waitFor_and_Click(this.ln_callSchedulings);
    }

    async clickOn_myProfile(){
        await methods.waitFor_and_Click(this.ln_myProfile);
    }

    async logout(){
        await methods.waitFor_and_Click(this.ln_logout);
    }

    
}
