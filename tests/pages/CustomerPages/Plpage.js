export class Plpage{
    constructor(page){
        this.page = page;
        this.project_Name = page.locator("//div[@id='IMNeTb2G5Kqw4dgF4pB2M']/div[1]");
        this.investAmount =  page.locator("//div[@id='53RIZfRLzXIeGpINbvXYKU']/div[2]");
        this.btn_oneLakh = page.locator("//div[@id='2ivdGZ0ngpn5eTzQNEPUYX']/button[1]");
        this.btn_fiveLakh = page.locator("//div[@id='2ivdGZ0ngpn5eTzQNEPUYX']/button[2]");
        this.in_area = page.locator("//div[@id='6JkhbaOR6K9z4TA01mtoAO']/div[2]");
        this.btn_invest = page.getByRole("button",{name : 'Invest Now'});
    }
    async projectname(){
        await this.project_Name.textContent();
    }
    async investamount(){
        await this.investAmount.textContent();
    }
    async onelakh(){
        await this.btn_oneLakh.click();
    }
    async fivelakh(){
        await this.btn_fiveLakh.click();
    }
    async area(){
        await this.in_area.textContent();
    }
    async investbutton(){
        await this.btn_invest.click();
    }
}