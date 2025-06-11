class ShellPage{
    constructor(page){
        this.page = page;
        this.dashboard = page.locator("//a[normalize-space()='Dashboard']");
        this.properties = page.locator("//a[normalize-space()='Properties']");
        this.page = page.locator("//a[normalize-space()='Documents']");
        this.transactions = page.locator("//a[normalize-space()='Transactions']");
        this.manageAccounts = page.locator("//a[normalize-space()='Manage Accounts']");
        this.contactManager = page.locator("//a[normalize-space()='Contact Manager']");
        this.myProfile = page.locator("//a[normalize-space()='My Profile']");
        this.scheduleCall = page.locator("div#zydLUWmz9HKLxtYoyKIyS");
        this.logout = page.locator("body > div:nth-child(1) > div:nth-child(69) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > a:nth-child(2)");
    }
    async dashboard(){
       await this.dashboard.click();
    }
    async properties(){
        await this.properties.click();
    }
    async documents(){
        await this.documents.click();
    }
    async transactions(){
        await this.transactions.click();
    }
    async manageAccounts(){
        await this.manageAccounts.click();
    }
    async contactManager(){
        await this.contactManager.click();
    }
    async myProfile(){
        await this.myProfile.click();   
    }
    async scheduleCall(){
        await this.scheduleCall.click();
    }
    async logout(){
        await this.logout.click();
    }
}