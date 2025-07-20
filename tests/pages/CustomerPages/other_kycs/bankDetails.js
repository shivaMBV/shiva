import { methods } from "../../../utils/methods";
import KYCother from "../../../../Test_data/KYCother.json";
import { faker } from "@faker-js/faker";

export class bankDetails{
    constructor(page){
        this.page = page;
        
        this.in_pan = page.getByPlaceholder("Enter pan number");
        this.uploadPan = page.locator("//div[@id='SUBEzol4cC5RUJO9d8bJF']//label");
        this.dateofIncorporation = page.getByPlaceholder("Select date");
        this.boardResolution = page.locator("//div[@id='5xI2F0kLmJh9Gr0avS13oU']//label");

        //Bank details locators
        this.accountType = page.getByPlaceholder("Select account type");
        this.ifsc = page.getByPlaceholder("Enter IFSC code");
        this.accountNumber = page.getByPlaceholder("Enter account number");
        this.bankName = page.getByPlaceholder("Enter bank name");
        this.cheque = page.locator("//div[@id='4d2qbFXce1GppJb8Yi6CR7']//label");
    }

    async enterOfficeName(type){
        this.in_KycTypeName = this.page.getByPlaceholder(`Enter ${type} name`);
        await this.in_KycTypeName.fill("peoples "+type+" media");
    }
    async panDetails(){
        await methods.fillData(this.in_pan, KYCother.panDetails.panNumber);
        await methods.uploadFile(this.page, null, this.uploadPan, "docs/dummy pan.pdf", null, null);
    }

    async DateOfIncorporation(){
        await methods.fillData(this.dateofIncorporation, KYCother.panDetails.dateOfIncorporation);
    }

    async uploadBoardResolution(){
        await methods.uploadFile(this.page, null,  this.boardResolution , "docs/pdf.pdf", null, null);
    }

    async bankDetails(){
        const accountT = faker.helpers.arrayElement(KYCother.bankDetails.accountType);
        await methods.selectDropdownOption(this.page, this.accountType, accountT);
        await methods.fillData(this.ifsc, KYCother.bankDetails.isfc);
        await methods.fillData(this.accountNumber, KYCother.bankDetails.accountNumber);
        await methods.fillData(this.bankName, KYCother.bankDetails.bankName);
        await methods.uploadFile(this.page, null, this.cheque, "docs/cancelled-cheque.pdf", null, null);
    }
}