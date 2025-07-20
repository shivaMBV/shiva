import { methods } from "../../utils/methods.js";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage.js";

export class Plp_galleryPage{

    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.imgSelector = page.locator("[id='1B8BKU1xyHJigMcWcfmfOI']");
        this.svgSelector = page.locator("[id='51vpsljOvKVugdVWyZvEhh'] svg");
    }

    async addingGalleryImages(){
        await methods.addingFields(this.page, this.imgSelector);
        await this.page.waitForTimeout(2000);
        const svg = await this.svgSelector.count();
        for(let i=0; i<svg; i++){
            const upload = await this.svgSelector.nth(i);
            await methods.uploadFile(this.page, upload, this.on._fileInput, "images/image 195522.svg", "image 195522.svg", this.on._select);
        }  
    }
}