import { methods } from "../../utils/methods";
import plplData  from "../../../Test_data/Project_configuration.json";
import { expect } from "@playwright/test";

export class ClientOnBoardingPage {

    constructor(page){
        this.page = page;
        
        this.filebuilderLogo = page.locator("[id='6aYJkowupGPvtIQ9HkTO6f'] div svg");
        this.builderTitle = page.getByPlaceholder("Enter the builder title");
        this.builderDesc = page.getByPlaceholder("Enter the builder description");
        this.fileAppLogo = page.locator("[id='8yx2Mjj8sliXIF8itpuTo'] div svg");
        this.uploadedBuilderLogoText = page.locator("[id='6aYJkowupGPvtIQ9HkTO6f'] div ~ div h3");
        this.uploadedAppLogoText = page.locator("[id='8yx2Mjj8sliXIF8itpuTo'] div ~ div h3");
        this.next = page.getByRole("button",{ title : "Next"});
        this.text = (text) => page.locator(`[title='${text}']`);
        this.save = page.getByRole("button", { name : "Save" });

        //FileSelector locators
        this.createFolder = page.getByRole("button", { title : "Create New Folder" });
        this._fileInput = page.locator("input._peInput");
        this._fileName =(filename) => page.locator(`[title='${filename}']`);
        this._select = page.locator("[title='Select']");
    }

    get fileInput(){
        return this._fileInput;
    }
    set fileInput(locator){
        this._fileInput = locator;
    }

    get fileName(){
        return this._fileName;
    }
    set fileName(locator){
        this._fileName = locator;
    }
    
    get select(){
        return this._select;
    }
    set select(locator){
        this._select = locator;
    }
    

    async onBoardingPage(){
        await methods.validateText(this.page,"Welcome to CX App for builders");
    }
    
    async uploadBuilderLogo(){
        await methods.uploadFile(this.page, this.filebuilderLogo, this._fileInput, "images/fincitylogo on dash.svg", "fincitylogo on dash.svg", this._select);
        await expect(this.uploadedBuilderLogoText).toHaveText("Builder Logo Uploaded Successfully");
    }

    async uploadAppLogo(){
        await methods.uploadFile(this.page, this.fileAppLogo, this._fileInput, "images/fincityLogo on shell.svg", "fincityLogo on shell.svg", this._select);
        await expect(this.uploadedAppLogoText).toHaveText("Application Logo Uploaded Successfully");
    }
    
    async onboardDetails(){
        await this.builderTitle.fill(plplData.clientonboard.builderTitle);
        await this.builderDesc.fill(plplData.clientonboard.builderDesc);   
        await this.next.click();
        // await expect(this.text(onboard.clientonboard.builderTitle)).toBeTruthy();
        // await expect(this.text(onboard.clientonboard.builderDesc)).toBeTruthy();
        await this.save.click();
        await expect(this.page.locator("[id='2SWdgORWhq3sH4jEaaambv'] div h1")).toHaveText("Ready to Build Something Amazing? Add Your Project Here!");
    }
}
