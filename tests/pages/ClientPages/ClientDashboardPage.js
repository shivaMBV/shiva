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
}
