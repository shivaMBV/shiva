import { methods } from "../../../utils/methods";
import { faker } from "@faker-js/faker";
import  kycIndividual  from "../../../../Test_data/KYC.json";
import {kyc_personalDetailsPage} from "../KYC Individual/kyc_personalDetailsPage";

export class kyc_professionalDetailsPage{
    constructor(page){
        this.page = page;
        this.kyc = new kyc_personalDetailsPage(this.page);
        this.profession = page.getByPlaceholder("Select profession");
        this.designation = page.getByPlaceholder("Enter your designation");
        this.companyName = page.getByPlaceholder("Enter company name");
        this.industry = page.getByPlaceholder("Select industry");
        this.function = page.getByPlaceholder("Select function");
        this.annualIncome = page.getByPlaceholder("Select annual income");
        this.proofNRIstatus = page.getByPlaceholder("Select status");
        this.proofNRIupload = page.locator("//div[@id='6fjELAbcSb3bxsXb7QIu2H']//label");
    }

    async professionDetails(){
        const Profession = faker.helpers.arrayElement(kycIndividual.KYC.individual.professionalDetails.profession);
        await methods.selectDropdownOption(this.page,this.profession,Profession);
        if(Profession === "Retired"){
            console.log("Retired Selected");
        }
        else if(Profession === "MNC"){
            await methods.fillData(this.designation, kycIndividual.KYC.individual.professionalDetails.designation);
            await methods.fillData(this.companyName, kycIndividual.KYC.individual.professionalDetails.companyName);
            const industryType = faker.helpers.arrayElement(kycIndividual.KYC.individual.professionalDetails.industry);
            await methods.selectDropdownOption(this.page,this.industry,industryType);
            const functionType = faker.helpers.arrayElement(kycIndividual.KYC.individual.professionalDetails.function);
            await methods.selectDropdownOption(this.page,this.function,functionType);
            const annualINcome = faker.helpers.arrayElement(kycIndividual.KYC.individual.professionalDetails.annualIncome);
            await methods.selectDropdownOption(this.page,this.annualIncome,annualINcome);

            await methods.fillData(this.kyc.selectAddress, kycIndividual.KYC.individual.professionalDetails.companyAddress);
            await methods.waitFor_and_Click(this.kyc.selectAddressValue.first());
            await this.page.waitForTimeout(3000);
        }
        return Profession;
    }

    async proofOFNRI(){
        const proofNRI = faker.helpers.arrayElement(kycIndividual.KYC.individual.professionalDetails.proofOfNRI);
        await methods.selectDropdownOption(this.page, this.proofNRIstatus, proofNRI);
        await methods.uploadFile(this.page, null, this.proofNRIupload, "docs/passport.pdf", null, null);
        //await this.kyc.onClickSave();
    }

}