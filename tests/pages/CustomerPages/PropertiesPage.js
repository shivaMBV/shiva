import { methods } from "../../utils/methods";
import plpData from "../../../Test_data/Project_configuration.json";

export class PropertiesPage{

    constructor(page){
        this.page = page;
        this.cards = page.locator("[id='5GEgODZ7k7TWcLqeaBjTbN']");
        this.projectName = page.locator("//div[@id='7btv2nxUjRr4bVSdpu2emv']/div[2]");
        this.assetType = page.locator("//div[@id='2Z6djt20rSxhRvz1iZH2SF']/div[2]");
        this.assetArea = page.locator("//div[@id='63ufuo54t6QibHJSBp5nsG']/div[2]");
        this.assetValue = page.locator("//div[@id='6PhaPZ7Sds3jtpdr5Ex7OI']/div[2]");
        this.btn_viewDetails =  page.locator(`//div[@title='${plpData.ProjectDetails.projectName}']/ancestor::div[@id='6H8un7JWqBkcfjTNN26Wu8']/following-sibling::div/button[1]`);
        this.startKYCtext = page.locator("[id='7LFBvRXy2iQ20WAjrGB8n8'] div div ~div div h1");
        this.btn_startKYC = page.locator("[title='Start KYC']");
    }

    async textVerification(){
        return await methods.validateText(this.page, "Ready to buy your dream property? Complete KYC to book")
    }
    
    async PN(){
        const count = await this.projectName.count();
        for (let i = 0; i < count; i++) {
            const element = await this.projectName.nth(i);
            const title = await element.getAttribute("title");
            if (await title.includes(plpData.ProjectDetails.projectName)) {
                await this.page.waitForLoadState("networkidle");
                await element.click();
                console.log("project name is : "+title);
                break;
            }
        }
    }

    async PT(){
        const count = await this.projectType.count();
        for (let i = 0; i < count; i++) {
            const element = await this.projectType.nth(i);
            const title = await element.getAttribute("title");
            if (await title.includes(plpData.ProjectDetails.SelectedProjectType)) {
                await this.page.waitForLoadState("networkidle");
                await element.click();
                console.log("project type is : "+title);
                break;
            }
        }
    }

    async clickOn_viewDetails(){
        await methods.waitFor_and_Click(this.btn_viewDetails);
    }

    

    
}