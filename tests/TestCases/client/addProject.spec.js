import { test, expect } from "@playwright/test";
import data from "../../../Test_data/userDetails.json";
import { PageObjectManager } from "../../utils/PageObjectManager";


test.only("add Project", async({page})=>{
    test.setTimeout(30000);
    const manager = new PageObjectManager(page);
    const login = await manager.getLoginPage();
    await login.loginUser(data.clientDetails.email, data.clientDetails.pin);

    const add = await manager.getaddProject();
    const plp = await manager.getPlpConfig();
    await add.clickAddProject();
    await add.verifyAddprojectURL();
    await add.addProjectLogo();
    await add.addBannerImg();

    const {ProjectName,ProType} = await add.addProjectDetails();
    await add.saveProject_NAMEandTYPE_inJSON(ProjectName,ProType);
    await add.verifyProjectOnDashboard(ProjectName,ProType);
});

// test("Adding Existng Project Name", async({page})=>{

//     const manager = new PageObjectManager(page);
//     const login = await manager.getLoginPage();
//     await login.loginUser(data.clientDetails.email, data.clientDetails.pin);

//     const dash = await manager.getaddProject();
//     const plp = await manager.getPlpConfig();
//     await dash.clickAddProject();
//     await dash.verifyAddprojectURL();
//     await dash.addProjectLogo();
//     await dash.addBannerImg();
//     await dash.addProjectDetails();
// });




      
  