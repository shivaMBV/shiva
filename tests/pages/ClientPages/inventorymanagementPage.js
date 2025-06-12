import { methods } from "../../utils/methods";
import plpData from "../../../Test_data/Project_configuration.json";

export class inventorymanagement{
    constructor(page){
        this.page = page;
        this.totalAvailableArea = page.locator("input#t_28cZ2qM0wUcuhKqJYbLi4t");
        this.amountPerSQFT = page.locator("input#t_6AXalaFEmN5gkuBteagBXx");
        this.minimumAmount = page.locator("input#t_3Z23k3F1GX2DrZzhHpP3KB");
        this.onSaveing = page.getByRole("button", { name : "Save & Continue" });
    }

    async enterTotalArea(){
        await this.page.waitForTimeout(1000);
        await methods.fillData(this.totalAvailableArea, plpData.inventoryManagement.totalAvailableArea); 
    }

    async amountSqFt(){
        await this.amountPerSQFT.fill(plpData.inventoryManagement.amountPerSqFt);
        await this.page.waitForTimeout(1000);
    }
    
    async minAmount(){
        await this.minimumAmount.fill(plpData.inventoryManagement.minimumAmount);
        await this.page.waitForTimeout(1000);
    }

    async saveInventory(){
        await this.onSaveing.click();
        await methods.validateText(this.page, "Inventory Management details Updated");
    }

}