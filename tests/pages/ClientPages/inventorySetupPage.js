import { HighlightSpanKind } from "typescript";
import { methods } from "../../utils/methods";
import { throws } from "assert";
import { expect } from "allure-playwright";
const ResidentialConfig = require ("../../../Test_data/Residential_Project.json"); 

export class inventorySetupPage{
    constructor(page){
        this.page = page;

        //Locators for apartments section
        this.unitType = page.locator("//div[@title='Unit type']/../following-sibling::div/label");
        this.carpetArea = page.locator("//div[@title='RERA carpet area']/../following-sibling::div/label");
        this.unitConfig = page.locator("//div[@title='Unit configuration']/../following-sibling::div/label");
        this.cpa = page.locator("//div[@title='Common proportionate area']/../following-sibling::div/label");
        this.uds = page.locator("//div[@title='UDS']/../following-sibling::div/label");
        this.plcConfig = page.locator("//div[@title='PLC configuration']/../following-sibling::div/label");
        this.floorNumber = page.locator("//div[@title='Floor number']/../following-sibling::div/label");
        this.superBuiltUpArea = page.locator("//div[@title='Super built-up area']/../following-sibling::div/label");
        this.carParkingArea = page.locator("//div[@title='Car parking']/../following-sibling::div/label");
        this.unitNumber = page.locator("//div[@title='Unit number']/../following-sibling::div/label");
        this.bookingStatus = page.locator("//div[@title='Booking status']/../following-sibling::div/label");
        this.facing = page.locator("//div[@title='Facing']/../following-sibling::div/label");

        //locator for Other Attributes section

        this.attributesVerify = page.locator("//div[@id='pEvX6qiAtE8yoKLopBCtc']//descendant::div[last()]//span");


        this.BHK = page.locator("[id='BRvmlegTlGyvO6UhlRJWx']");
        this.Toilet = page.locator("[id='7LpO7RXfAF13Al0c9pCKZ']");
        this.unitAddSubCategory = page.locator("div[id='3FqK83PsHMuIiVYCUF1eCd'] span:nth-child(1)");
        this.save = page.getByRole("button",{ name : "Save & Continue"});
        this.back = page.locator("button",{ name : "Back to configure" });

        //locators for facing section
        this.facing = page.locator("[id='2jv9nrKrxtMx5u4iuWaWpH']");
        this.facingAddSubCategory = -page.locator("div[id='5C8nkIhTsv0GFhNw8Feo0'] span:nth-child(1)");
        this.plc = page.locator("[id='RBq9MlVmhsOmi8oW07oDf']");
        this.plcAddSubCategory = page.locator("div[id='4vlpWChmReQ8THvIpIS1v3'] span:nth-child(1)");
    }

    async otherAttributes(){
        const attributes = ResidentialConfig.Residential.inventorySetUp.otherAttributes;
        for(const attribute of attributes){
            await methods.waitFor_and_Click(this.page.locator(`//div[@title='${attribute}']/../following-sibling::div/label`));
        }
        const texts = await this.attributesVerify.allTextContents();
        for(const verify of attributes){
           expect(texts.some(text => text.includes(verify))).toBeTruthy();
        }
    }

    async facingType(){
        const facings = ResidentialConfig.Residential.inventorySetUp.facing;
        let comboIndex = 0;
        for(const face of facings){
            if (comboIndex > 0) {
                await methods.waitFor_and_Click(this.facingAddSubCategory); // update selector
                }
                const facingDD = this.facing.nth(comboIndex);
                await methods.waitFor_and_Click(facingDD);
                await this.page.locator(`label:has-text("${face}")`).last().click();
                comboIndex++;
            
        }
    }

    async PLCConfiguration(){
        const plc = ResidentialConfig.Residential.inventorySetUp.PLCconfiguration;
        let comboIndex = 0;
        for(const PLC of plc){
            if (comboIndex > 0) {
                await methods.waitFor_and_Click(this.plcAddSubCategory); // update selector
                }
                const plcDD = this.plc.nth(comboIndex);
                await methods.waitFor_and_Click(plcDD);
                await this.page.locator(`label:has-text("${plc}")`).last().click();
                comboIndex++;
            
        }
    }

   async unitConfiguration(){
        const bhkOptions = ResidentialConfig.Residential.inventorySetUp.unitConfig.BHK;
        const tOptions = ResidentialConfig.Residential.inventorySetUp.unitConfig.T;
        let comboIndex = 0;
        for (const bhk of bhkOptions) {
            for (const t of tOptions) {
             // Skip add button for first row
            if (comboIndex > 0) {
            await methods.waitFor_and_Click(this.unitAddSubCategory); // update selector
            }
            // Select BHK
            const bhkDropdown = this.BHK.nth(comboIndex);
            await methods.waitFor_and_Click(bhkDropdown);
            await this.page.locator(`label:has-text("${bhk}")`).last().click(); // may use nth or specific parent if multiple labels exist
            // Select T
            const tDropdown = this.Toilet.nth(comboIndex);
            await methods.waitFor_and_Click(tDropdown);
            await this.page.locator(`label:has-text("${t}")`).last().click();
            comboIndex++;
           }
        }
   }  


}