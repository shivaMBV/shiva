import { methods } from "../../utils/methods";

export class kycBentogridsPage {
    constructor(page){
        this.page = page;
        this.kyc_ind = page.locator("[title='Individual']");
        this.kyc_llp = page.locator("[title='Limited Liability  Partnership']");
        this.kyc_pvt = page.locator("[title='Private']");
        this.kyc_trust = page.locator("[title='Trust']");
        this.kyc_partnership = page.locator("[title='Partnership']");
        this.kyc_huf = page.locator("[title='HUF']");
        this.kyc_joint = page.locator("[title='Joint']");
    }

    async clickOn_kyc_individual(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_ind);
    }

    async clickOn_kyc_llp(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_llp);
    }

    async clickOn_kyc_pvt(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_pvt);
    }

    async clickOn_trust(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_trust);
    }

    async clickOn_partnership(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_partnership);
    }

    async clickOn_huf(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_huf);
    }

    async clickOn_joint(){
        await this.page.waitForTimeout(3000);
        await methods.waitFor_and_Click(this.kyc_joint);
    }
}