import { methods } from "../../utils/methods";
const plplData = JSON.parse(JSON.stringify(require("../../../Test_data/Project_configuration.json")));
const Project_configPath = path.resolve(__dirname, "../../../Test_data/Project_configuration.json");
import { ClientOnBoardingPage }  from "./ClientOnBoardingPage";
import userData from "../../../Test_data/userDetails.json";
import { expect } from "@playwright/test";
const fs =  require("fs");
import path from "path";
import { faker } from "@faker-js/faker";
import { PageObjectManager } from "../../utils/PageObjectManager";

export class addProject{

    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.project_logo = page.locator("//div[@id='7bSgm3ID2Tadjcd0ZqqXvt']//div/label");
        this.banner_Img = page.locator("//div[@id='4Wh3DubtDFnGEqzJeCKzRc']//div/label");
        this.txt_projectName = page.getByPlaceholder("Enter project name");
        this.dd_projectType = page.getByPlaceholder("Select project type");  
        this.dd_productType = page.getByPlaceholder("Select product type");
        this.btn_save = page.getByRole("button", { name : "Save project" });
        this.successMSG = page.locator("span", { hasText: "Project has been added succesfully" });
        this.PN = page.locator("[id='7btv2nxUjRr4bVSdpu2emv'] div ~ div");
        this.ProType = page.locator("[id='2Z6djt20rSxhRvz1iZH2SF'] div ~div");
        this.btn_config = page.locator(`//div[@title='${plplData.ProjectDetails.projectName}']/ancestor::div[@id='6H8un7JWqBkcfjTNN26Wu8']/following-sibling::div/button[1]`);
        this.btn_viewDetails =  page.locator(`//div[@title='${plplData.ProjectDetails.projectName}']/ancestor::div[@id='6H8un7JWqBkcfjTNN26Wu8']/following-sibling::div/button[2]`);
        this.errorMSG = page.locator("//div[@class='_msgStringContainer']/div");
    }


    async clickAddProject(){
        const manager = new PageObjectManager(this.page);
        await methods.waitFor_and_Click(await manager.getClientDashboard().btn_addProject);
    }
    async verifyAddprojectURL(){
        const expectedURL = await methods.getClientUrl(userData.clientDetails.company,"addProject");
        await this.page.waitForURL(expectedURL);
        const actualURL = await this.page.url();
        expect(actualURL).toEqual(expectedURL);
    }

    async addProjectLogo(){      
        await this.page.waitForTimeout(2000);
        await methods.uploadFile(this.page, null, this.project_logo, "images/fincitylogo on dash.svg", null, null);
        const altText = await this.page.locator("[id='7bSgm3ID2Tadjcd0ZqqXvt'] div img").getAttribute("alt");
        expect(altText).toBe("file name");
    }

    async addBannerImg(){    
        await methods.uploadFile(this.page, null, this.banner_Img, "images/emids.jpg", null, null);
        const altText = await this.page.locator("[id='1QZlEixg7X92TZssA8YgI9'] div img").getAttribute("alt");
        expect(altText).toBe("file name");
    }

    async addProjectDetails(){
        const ProjectName = await methods.generateProjectName();
        await methods.fillData(this.txt_projectName, ProjectName);

        const ProType = faker.helpers.arrayElement(plplData.ProjectDetails.projectsType);
        await methods.selectDropdownOption(this.page, this.dd_projectType, ProType);
        const selectedType = await this.dd_projectType.inputValue();
        if(selectedType === "Commercial"){
            await this.saveProject();
        }
        else if(selectedType === "Residential"){
            await methods.selectDropdownOption(this.page, this.dd_productType , "Apartments");
            await this.saveProject();
        }
        return {ProjectName, ProType};
    }

    async saveProject(){
        await this.btn_save.click();
        await this.page.waitForTimeout(1000);
        const actualMSG = await this.successMSG;
        await expect(actualMSG).toHaveText("Project has been added succesfully");
    }

    async saveProject_NAMEandTYPE_inJSON(ProjectName,ProType){
        const Project_configuration = JSON.parse(fs.readFileSync(Project_configPath, "utf-8"));
        Project_configuration.ProjectDetails.projectName = ProjectName;
        Project_configuration.ProjectDetails.SelectedProjectType = ProType;
        fs.writeFileSync(Project_configPath, JSON.stringify(Project_configuration, null, 2), "utf-8");
        await console.log("Project Name :" +ProjectName,", Project Type : "+ ProType);
    }

    async verifyProjectOnDashboard(ProjectName,ProType){
        await this.page.waitForTimeout(2000);
        const PNcount = await this.PN.count(); 
        const ProTypeCount = await this.ProType.count();
        let matchFound = false;
        for(let i=0; i<PNcount; i++){
            const PN_actual = await this.PN.nth(i).getAttribute("title");
            const ProType_actual = await this.ProType.nth(i).getAttribute("title");
            if (PN_actual === ProjectName && ProType_actual === ProType) {
                matchFound = true;
                console.log("is project is created : " +matchFound);
                break;
            }
        }
    }

    async regeneratedPN(){
        await this.errorMSG.isvisible();
        const reGeneratedName = await methods.generateProjectName();
        await this.txt_projectName.fill('');
        await this.txt_projectName.fill(reGeneratedName);
        return reGeneratedName;
    }

    // async addExistingProjectName(){
    //     await methods.fillData(this.projectName, plplData.ProjectDetails.projectName);
    //     const trimmedName = onboard.ProjectDetails.projectName.replace(/\s*\d+$/, "");
    //     await this.projectTitle.fill(trimmedName);
    //     await this.projectDescription.fill(onboard.ProjectDetails.projectDescription);
    // }
}

    

    
       