import { methods } from "../../../utils/methods";
import KYCother from "../../../../Test_data/KYCother.json";


export class companyAddress{
    constructor(page){
        this.page = page;
        this.landmark = page.getByPlaceholder("Enter landmark");
        this.uploadDocs = page.locator("[class='_progressBarUploadButton']");
        this.btn_finish = page.getByRole("button", { name : "Finish KYC" });
    }

    async fillLandmark(){
        await methods.fillData(this.landmark.first(), KYCother.officeAddress.landmark);
    }

    async certificateofIncorporation(){
        await methods.uploadFile(this.page, null, this.uploadDocs.first(), "docs/pdf.pdf", null, null);
    }

    async uploadLLPcertificate(){
        await methods.uploadFile(this.page, null, this.uploadDocs.first(), "docs/pdf.pdf", null, null);
    }

    async finishKyc(){
        await methods.waitFor_and_Click(this.btn_finish);
    }

}