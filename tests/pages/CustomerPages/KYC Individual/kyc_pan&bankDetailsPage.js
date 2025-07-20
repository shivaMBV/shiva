import { methods } from "../../../utils/methods";
import  kycIndividual  from "../../../../Test_data/KYC.json";
import { faker } from "@faker-js/faker";
import { kyc_personalDetailsPage } from "../KYC Individual/kyc_personalDetailsPage";

export class kyc_pan_bankDetailsPage{

    constructor(page){
        this.page = page;
        this.kyc = new kyc_personalDetailsPage(this.page);
        this.in_pan = page.getByPlaceholder("Enter pan number");
        this.in_nameOnPan = page.getByPlaceholder("Enter name");
        this.in_bankName = page.getByPlaceholder("Enter bank name");
        this.uploadPan = page.locator("//div[@id='tMopdxsL1Vnuc8M5uTH0c']//label");
        this.selectAccountType = page.getByPlaceholder("Select account type");
        this.in_accountNumber = page.getByPlaceholder("Enter account number");
        this.uploadCheque = page.locator("//div[@id='4eBLotmtq58S8NYwIgEurx']//label");
        this.in_ifsc = page.getByPlaceholder("Enter IFSC code");
        this.finishKYC = page.getByRole("button", { name : "Finish KYC"});
    }

    async panDetails(){
        await methods.fillData(this.in_pan, kycIndividual.KYC.individual.panANDbankDetails.pan);
        const firstName_F = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.firstName.Female);
        const lastName_F = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.lastName);
        await methods.fillData(this.in_nameOnPan, firstName_F+" "+lastName_F);
        await methods.uploadFile(this.page, null, this.uploadPan, "docs/dummy Pan.pdf", null, null);
    }

    async bankDetails(){
        const bank = faker.helpers.arrayElement(kycIndividual.KYC.individual.panANDbankDetails.bankName);
        await methods.fillData(this.in_bankName, bank);
        if(this.kyc.resident === "RI"){
            const RIacntType = faker.helpers.arrayElement(kycIndividual.KYC.individual.panANDbankDetails.RIaccountType);
            await methods.selectDropdownOption(this.page,this.selectAccountType, RIacntType);
        }
        else if(this.kyc.resident === "NRI"){
            const NRIacntType = faker.helpers.arrayElement(kycIndividual.KYC.individual.panANDbankDetails.NRIaccountType);
            await methods.selectDropdownOption(this.page,this.selectAccountType, NRIacntType);
        }
        await methods.fillData(this.in_accountNumber, kycIndividual.KYC.individual.panANDbankDetails.accountNumber);
        await methods.uploadFile(this.page, null, this.uploadCheque, "docs/cancelled-cheque.pdf", null, null);
        await methods.fillData(this.in_ifsc,bank+"0000123");
    }   

    async clickOnFinishKYC(){
        await methods.waitFor_and_Click(this.finishKYC);
    }

}