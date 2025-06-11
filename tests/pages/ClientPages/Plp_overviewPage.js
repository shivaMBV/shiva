import { methods } from "../../utils/methods";
import plpData from "../../../Test_data/Project_configuration.json";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage";
import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class Plp_overviewPage{

    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.txt_overview = page.locator("[id='6SiAuEdvgLhbmP4xPN01MH']");
        this.txt_assetOverview = page.locator("[id='JCHQvs54Oi6x4hHXAKaNE'] div textarea");
        this.txt_assetFeature = page.locator("[id='3ZnTuDxG7b5orq7GkcrsPG']");
        this.img_assetFeature = page.locator("[id='2j1YNQg3kfa5DqH69wLK7e'] div");
        this.txt_assetDescription = page.locator("[id='2Q7cSW09OBpvHf7gqNiMfe']");
        this.mapLocaton = page.locator("[id='t_5WMoBFaixTEjlpZj7YAghh']");
        this.locationInput = page.locator("[id='t_4KLojJDMMS4wK1ZUxgYZeM']");
        this.addLocations = page.locator("[title='Add nearby location']");
        this.txt_aboutLocation = page.locator("[id='Mp5ieaVTetOcYWqZDgB2T']");
        this.img_location = page.locator("[id='2ghuUuVfVmPaiMBg9UcdQK'] div img");
        this.iframe = page.locator("//div[@id='1ZL0ga2hgpiX0A6NSOLmse']");
    }

    async overview(){
        //await methods.scrollToElement(this.txt_overview);
        await methods.fillData(this.txt_overview, plpData.PLP_Configuration.overview.assetOverview);
    }

    async assetOverview(){
        await methods.fillData(this.txt_assetOverview, plpData.PLP_Configuration.overview.assetOverview);
    }

    async assetFeature(){
        await methods.fillData(this.txt_assetFeature, plpData.PLP_Configuration.overview.assetFeature);
        await methods.uploadFile(this.page, this.img_assetFeature, this.on._fileInput,"/images/assetFeature.svg", "assetFeature.svg", this.on._select);
    }

    async location(){
        const latitude = faker.location.latitude();
        const longitude = faker.location.longitude();
        const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
        await this.mapLocaton.fill(mapSrc);
        await this.page.waitForTimeout(3000);
        await expect(this.iframe).toBeVisible();
        await methods.addingFields(this.page, this.addLocations);

        const input = this.locationInput;
        const count = await input.count();
        for(let i=0; i<count; i++){
            const locationField = input.nth(i);
            const locationValue = ((await locationField.inputValue()).trim());
            if(!locationValue){
                await locationField.fill("Bus Stop : "+i+i +" Meters");
            }
        }
        await this.txt_aboutLocation.fill(plpData.PLP_Configuration.overview.aboutLocation);
    }
}