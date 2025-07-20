import { methods } from "../../utils/methods";
const plpData = require("../../../Test_data/Project_configuration.json");
import { ClientOnBoardingPage } from "./ClientOnBoardingPage";
import { expect } from "@playwright/test";


export class Plp_basicDetailsPage{

    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        //Basic Details
        this.strategicLogo = page.locator("//div[@id='58cGx76Un5VqffqN1CuGIU']/div/img");
        this.projectName = page.locator("#t_6QLV5K284qOD55mKw8AeDs");
        this.location = page.getByLabel("Location");
        this.point1 = page.getByLabel("Point 1");
        this.point2 = page.getByLabel("Point 2");
        this.point3 = page.getByLabel("Point 3");
        this.parameter1 = page.locator("[id='t_2dYQ81bhkSWv9MLLbHiUrx']");
        this.value1 =  page.locator("[id='t_2nTnyBaaaJJXeuhm7y5q7W']");
        this.parameter2 = page.locator("[id='t_2Kc07rpgrZtYAiqnBI49Gs']");
        this.value2 = page.locator("[id='t_5KhCLhIXxlvGedi3ZnT8v']");
        this.totalAmount = page.getByLabel("Total amount");
        this.completed = page.getByLabel("Completed");
        this.parameter = page.locator("[id='t_1fOB8CRwFTisgIEtxPlemR']");
        this.Data = page.locator("[id='t_72qJRmlerTJtbuujTHAK7s']");
        this.fileSelector = page.locator("[id='535nQGIM2WCzJw4OQ6wXuR'] svg");
        this.addSpecification = page.locator("[title='Add specifications']");
        this.assetType = page.getByLabel("Asset type");
        this.assetValue = page.getByLabel("Asset value");
        this.assetArea = page.getByLabel("Asset area");
        this.reeraNumber = page.getByLabel("RERA number");
        this.certificate = page.locator("[id='1gDsOnVieUl6C5w0wxk8Gb'] div ~div");
        this.TC = page.locator("[id='6KY3vS8TY8esAsNbd1S8cl']");
        this.save = page.getByRole("button", { name : "Save & Continue" });
    }

    async addStrategicLogo(){
        await methods.uploadFile(this.page, this.strategicLogo, this.on._fileInput, "images/fincitylogo on dash.svg", "fincitylogo on dash.svg", this.on._select);
    }

    async addingProjectLocation(){
        const actual = await this.projectName.getAttribute("value");
        expect(actual).toBe(plpData.ProjectDetails.projectName);
        await methods.fillData(this.location, (await methods.generateLocation()).city);
    }

    async addingKeyPoints(){
        await this.point1.fill(plpData.PLP_Configuration.basicDetails.keyPoints.point1);
        await this.point2.fill(plpData.PLP_Configuration.basicDetails.keyPoints.point2);
        await this.point3.fill(plpData.PLP_Configuration.basicDetails.keyPoints.point3);
        await this.parameter1.fill(plpData.PLP_Configuration.basicDetails.parameter1);
        await this.value1.fill(plpData.PLP_Configuration.basicDetails.value1);
        await this.parameter2.fill(plpData.PLP_Configuration.basicDetails.parameter2);
        await this.value2.fill(plpData.PLP_Configuration.basicDetails.value2);
        await this.totalAmount.fill(plpData.PLP_Configuration.basicDetails.progressBar.totalAmount);
    }

    async progressBar(){
        await methods.fillData(this.totalAmount, plpData.PLP_Configuration.basicDetails.progressBar.totalAmount);
        await methods.fillData(this.completed, (await methods.fakerData()).digits);
    }

    async addingSpecifications(){
        await methods.addingFields(this.page, this.addSpecification);
        await methods.specifications(this.page, this.parameter, this.Data, this.fileSelector, this.on._fileInput, "images/I_percentage.svg", "I_percentage.svg", this.on._select);
    }

    async addingCardDetails(){
        await this.assetType.fill(plpData.PLP_Configuration.basicDetails.cardDetails.assetType);
        await this.assetValue.fill((await methods.fakerData()).amount);
        await this.assetArea.fill((await methods.fakerData()).area);
    }

    async addingReeraAndTC(){
        await this.reeraNumber.fill(((await methods.fakerData()).alphaNumeric).toUpperCase());
        await methods.uploadFile(this.page, this.certificate, this.on._fileInput, "docs/pdf.pdf", "pdf.pdf", this.on._select);
        await this.TC.fill(plpData.PLP_Configuration.basicDetails.termsAndCondition); 
    }

    async savingData(){
        await methods.waitFor_and_Click(this.save);
    }
}