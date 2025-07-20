import { methods } from "../../utils/methods.js";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage.js";

export class Plp_documentPage{
    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);

        this.btn_addMasterPlan = page.locator("[id='7xra58ILImHwstWMEdLjkD']");
        this.txt_masterPlan = page.locator("[id='27xDLxuzAalXWNSgcb0sve'] input");
        this.img_masterPlan = page.locator("//div[@id='27xDLxuzAalXWNSgcb0sve']//div[@class='comp compFileSelector  _primary']");

        this.btn_floorPlan = page.locator("[id='1fCiTVael5HeCa2HMOCrc7']");
        this.txt_floorPlan = page.locator("[id='3efalhOXcYJ5nQXdlmNDbY'] input");
        this.img_floorPlan = page.locator("//div[@id='3efalhOXcYJ5nQXdlmNDbY']//div[@class='comp compFileSelector  _primary']");

        this.btn_Brochures = page.locator("[id='DBlXZl4q5EdVbDQqEBaCO']");
        this.txt_Brochures = page.locator("[id='istHJ5r24kQIB4jp3JUQG'] input");
        this.img_Brochures = page.locator("//div[@id='istHJ5r24kQIB4jp3JUQG']//div[@class='comp compFileSelector  _primary']");
    }
        
    async addMasterPlan() {
        await methods.waitFor_and_Click(this.btn_addMasterPlan);
        await this.txt_masterPlan.fill("Master Plan");
        await methods.uploadFile(this.page, this.img_masterPlan, this.on._fileInput, "docs/pdf.pdf", "pdf.pdf", this.on._select);
        await this.page.waitForTimeout(1500);
    }


    async addFloorPlan() {
        await methods.waitFor_and_Click(this.btn_floorPlan);
        await this.txt_floorPlan.fill("Floor Plan");
        await methods.uploadFile(this.page, this.img_floorPlan, this.on._fileInput, "docs/pdf.pdf", "pdf.pdf", this.on._select);
        await this.page.waitForTimeout(1500);
    }

    async addBrochures() {  
        await methods.waitFor_and_Click(this.btn_Brochures);
        await this.txt_Brochures.fill("Brochure Plan");
        await methods.uploadFile(this.page, this.img_Brochures, this.on._fileInput, "docs/pdf.pdf", "pdf.pdf", this.on._select);
        await this.page.waitForTimeout(1500);
    }

}