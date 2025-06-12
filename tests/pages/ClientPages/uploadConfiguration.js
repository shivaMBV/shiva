import { methods } from "../../utils/methods";
import plpData from "../../../Test_data/Project_configuration.json";
const fileList1 = plpData.uploadDocuments.agreements;
const fileList2 = plpData.uploadDocuments.legal;

export class uploadConfiguration{
    constructor(page){
        this.page = page;
        this.agreementsUpload = page.locator("//div[@id='3tAa6u1SBGBLceBMXPa3dY']//div//label[2]");
        this.legalUpload = page.locator("//div[@id='29ewXAdraNqaAsYRcZM1Hr']//div//label[2]");
        this.save = page.getByRole("button", { name : "Save & Continue" });
        this.updatedMSG =  page.locator("//div[@class='_msgString']");
    }

    async uploadAgreements(){
        await this.page.waitForTimeout(4000);
        await methods.uploadFile(this.page, null, this.agreementsUpload, fileList1, null, null);
        // await this.updatedMSG.waitFor({ state: 'visible' });
        // await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
    }

    async uploadLegal(){
        await this.page.waitForTimeout(6000);
        await methods.uploadFile(this.page, null, this.legalUpload, fileList2, null, null);
        // await this.updatedMSG.waitFor({ state: 'visible' });
        // await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
    }

    async onSaving(){
        await this.save.click();
    }
    
 
}