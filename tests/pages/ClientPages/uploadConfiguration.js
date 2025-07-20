import { methods } from "../../utils/methods";
import plpData from "../../../Test_data/Project_configuration.json";
const fileList1 = plpData.uploadDocuments.agreements.sale;
const fileList2 = plpData.uploadDocuments.agreements.lease;
const fileList3 = plpData.uploadDocuments.agreements.ama;
const fileList4 = plpData.uploadDocuments.agreements.spoa;
const fileList5 = plpData.uploadDocuments.legal;

export class uploadConfiguration{
    constructor(page){
        this.page = page;
        this.agreements_sale = page.locator("//div[@id='2G87Zhk9Sb3jGPguN86hks']//div//label[2]");
        this.agreements_lease = page.locator("//div[@id='2iGDedbmDMksRgohBKaciw']//div//label[2]");
        this.agreements_ama = page.locator("//div[@id='3S9icMsFvZkwGh7X6HqRUM']//div//label[2]");
        this.agreements_spoa = page.locator("//div[@id='5yA9Ieg0uG4Lg8gKLIT4ug']//div//label[2]")
        this.legal = page.locator("//div[@id='60ByDnolKs2M6VpkzMohOk']//div//label[2]");
        this.save = page.getByRole("button", { name : "Save & Continue" });
        this.updatedMSG =  page.locator("//div[@class='_msgString']");
        this.cross = page.locator("[class='fa fa-solid fa-circle-xmark _msgCloseIcon']");
    }
//Document Uploaded Successfully
    async uploadAgreements_sale(){
        await this.page.waitForTimeout(3000);
        await methods.uploadFile(this.page, null, this.agreements_sale, fileList1, null, null);
        await this.updatedMSG.waitFor({ state: 'visible' });
        await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
        await this.cross.click();
    }

    async uploadAgreements_lease(){
        await methods.uploadFile(this.page, null, this.agreements_lease, fileList2, null, null);
        await this.updatedMSG.waitFor({ state: 'visible' });
        await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
        await this.cross.click();
    }

    async uploadAgreements_ama(){
        await methods.uploadFile(this.page, null, this.agreements_ama, fileList3, null, null);
        await this.updatedMSG.waitFor({ state: 'visible' });
        await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
        await this.cross.click();
    }

    async uploadAgreements_spoa(){
        await methods.uploadFile(this.page, null, this.agreements_spoa, fileList4, null, null);
        await this.updatedMSG.waitFor({ state: 'visible' });
        await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
        await this.cross.click();
    }

    async uploadLegal(){
        await methods.uploadFile(this.page, null, this.legal, fileList5, null, null);
        // await this.updatedMSG.waitFor({ state: 'visible' });
        // await methods.validateText(this.updatedMSG,"Document Uploaded Successfully");
    }

    async onSaving(){
        await this.save.click();
    }
    
 
}