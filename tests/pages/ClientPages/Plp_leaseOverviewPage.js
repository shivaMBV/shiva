import { methods } from "../../utils/methods";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage";

export class Plp_leaseOverviewPage{


    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.table1_head = page.locator("//div[@title='Table 1']/../div[2]");
        this.table1_img = page.locator("//div[@title='Table 1']/../following-sibling::div//div[@id='5zh50VhtjNxzxbyVvHj1WW']/div[2]/div");
        this.table1_text = page.locator("(//div[@title='Table 1']/../following-sibling::div//div/textarea[1])[1]");
        this.table1_add = page.locator("//div[@title='Table 1']/../following-sibling::div[2]/div");

        this.table2_head = page.locator("//div[@title='Table 2']/../div[2]");
        this.table2_img = page.locator("//div[@title='Table 2']/../following-sibling::div//div[@id='6HIWXxWchiWQSIk9Mxndy1']/div[2]/div");
        this.table2_text = page.locator("(//div[@title='Table 2']/../following-sibling::div//div/textarea[1])[1]");
        this.table2_add = page.locator("//div[@title='Table 2']/../following-sibling::div[2]/div");
        
        this.table3_head = page.locator("//div[@title='Table 3']/../div[2]");
        this.table3_img = page.locator("//div[@title='Table 3']/../following-sibling::div//div[@id='43dKdQSaNvSDDb6JuwnSJ']/div[2]/div");
        this.table3_text = page.locator("(//div[@title='Table 3']/../following-sibling::div//div/textarea[1])[1]");
        this.table3_add = page.locator("//div[@title='Table 3']/../following-sibling::div[2]/div");

        this.table4_head = page.locator("//div[@title='Table 4']/../div[2]");
        this.table4_img = page.locator("//div[@title='Table 4']/../following-sibling::div//div[@id='1tS0GMsHkCh59utXKewHD8']/div[2]/div");
        this.table4_text = page.locator("(//div[@title='Table 4']/../following-sibling::div//div/textarea[1])[1]");
        this.table4_add = page.locator("//div[@title='Table 4']/../following-sibling::div[2]/div");

        this.table5_head = page.locator("//div[@title='Table 5']/../div[2]");
        this.table5_img = page.locator("//div[@title='Table 5']/../following-sibling::div//div[@id='MsTa1LzK7tUNdlyTLaPHN']/div[2]/div");
        this.table5_text = page.locator("(//div[@title='Table 5']/../following-sibling::div//div/textarea[1])[1]");
        this.table5_add = page.locator("//div[@title='Table 5']/../following-sibling::div[2]/div");

        this.input = page.getByLabel("Enter table/chart name");
        this.cross = page.locator(".TitleIconGrid .closeButtonPosition");
    }

    async fillTable1_Data(){
        await methods.waitFor_and_Click(this.table1_add);
        await this.page.waitForTimeout(2000);
        await methods.uploadFile(this.page, this.table1_img, this.on._fileInput, "images/lease overview 1.svg", "lease overview 1.svg",this.on._select);
        await methods.waitFor_and_Click(this.table1_head);
        await methods.fillData(this.input,"Lease overview");
        await this.cross.click();
    }

    async fillTable2_Data(){
        await methods.waitFor_and_Click(this.table2_add);
        await this.page.waitForTimeout(2000);
        await this.table2_text.fill("The lease rental range is between INR 90-105 in the subject micro market");
        await methods.uploadFile(this.page, this.table2_img, this.on._fileInput, "images/Lease comparables.svg", "Lease comparables.svg", this.on._select);
        await methods.waitFor_and_Click(this.table2_head);
        await methods.fillData(this.input,"Lease comparables");
        await this.cross.click();
        
    }

    async fillTable3_Data(){
        await methods.waitFor_and_Click(this.table3_add);
        await this.page.waitForTimeout(2000);
        await this.table3_text.fill("Our Purchase price is at a ~13.4% discount to the prevailing market rate ");
        await methods.uploadFile(this.page, this.table3_img, this.on._fileInput, "images/Sale comparables.svg","Sale comparables.svg", this.on._select);
        await methods.waitFor_and_Click(this.table3_head);
        await methods.fillData(this.input,"Sale comparables");
        await this.cross.click(); 
    }
}