import { kyc_personalDetailsPage } from "../KYC Individual/kyc_personalDetailsPage";
import kycIndividual from "../../../../Test_data/KYC.json";
import { faker } from "@faker-js/faker";
import { methods } from "../../../utils/methods";


export class kyc_authorizedPersonDetailsPage{
    constructor(page){
        this.page = page;
        this.kyc = new kyc_personalDetailsPage(this.page);
    }

    async authorizedPersonDetails(){
        await this.kyc.maleName();
        const Phone = (await methods.fakerData()).phone;
        await methods.fillData(this.kyc.phoneNumber, Phone);
        const {email} = await methods.generateEmail();
        await methods.fillData(this.email,email);
        await methods.fillData(this.DOB,kycIndividual.KYC.individual.basicDetails.dob);
        await this.kyc.aadharDetails();
    }
}