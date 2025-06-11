import { methods } from "../../utils/methods";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage";

export class Plp_tenantPage {

    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.tenant = page.locator("[id='t_2iTyjM45KSNOojgqxIWoi']");
        this.addKeyPoints = page.locator("[title='Add key points']");
        this.parameter = page.locator("[id='t_2mSKnPWNgVLp5I9fGs85YI']");
        this.data = page.locator("[id='t_5w7r7DXNCJ75aUGjBTc4x0']");
        this.addSpecification = page.locator("[title='Add specifications']");
        this.fileSelector = page.locator("[id='535nQGIM2WCzJw4OQ6wXuR'] svg");

    }

    async keypoints(){
        await methods.addingFields(this.page, this.addKeyPoints);
        
        const tenant = this.tenant;
        const count = await tenant.count();
        for(let i=0; i<count; i++){
            const tenantfield = tenant.nth(i);
            const tenantValue = ((await tenantfield.inputValue()).trim());
            if(!tenantValue){
                await tenantfield.fill((await methods.fakerData()).sentance);
            }
        }
    }

    async addingSpecifications(){
        await methods.addingFields(this.page, this.addSpecification);
        await methods.specifications(this.page, this.parameter, this.data, this.fileSelector, this.on._fileInput, "images/I_percentage.svg", "I_percentage.svg", this.on._select);
    }
}



