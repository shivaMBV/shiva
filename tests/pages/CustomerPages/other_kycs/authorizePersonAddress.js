import { methods } from "../../../utils/methods";
import  KYCother  from "../../../../Test_data/KYCother.json";
import { faker } from "@faker-js/faker";

export class authorizePersonAddress {

    constructor(page){
        this.page = page;
        
        this.cummunicationText = page.locator("[title='Communication address']");
        this.fullAddress = page.getByPlaceholder("Enter full address");
        this._country = page.getByPlaceholder("Select country");
        this.pincode = page.getByPlaceholder("Enter pincode");
        this.city = page.getByPlaceholder("Enter city");
        this.state = page.getByPlaceholder("Enter state");
        this.checkbox = page.locator("[role='checkbox']");

        this.documentType = page.locator("[placeholder='Select ']");
        this.documentNumber = page.getByPlaceholder("Enter document number");
        this.documentUpload = page.locator("[class='_progressBarUploadButton']");
    }

    async addressDetails(){
        const street = faker.location.streetAddress();
        await methods.fillData(this.fullAddress.first(), street);

        const Country = this._country.first();
        await methods.selectDropdownOption(this.page, Country,"India");

        const pin = faker.helpers.arrayElement(KYCother.Address.cummunicaitonAddress.pincode);
        await methods.fillData(this.pincode.first(),pin);
        await methods.waitFor_and_Click(this.cummunicationText);
        await this.page.waitForTimeout(2000);
    }

    async checkbox_click(){
        await this.checkbox.click();
    }

    async docTypeUpload(){
        const doc = faker.helpers.arrayElement(KYCother.Address.permanentAddress.documentType);
        await methods.selectDropdownOption(this.page, this.documentType, doc);
        await methods.fillData(this.documentNumber, KYCother.Address.permanentAddress.documentNumber);
        await methods.uploadFile(this.page, null, this.documentUpload, "docs/pdf.pdf", null, null);
    }
}