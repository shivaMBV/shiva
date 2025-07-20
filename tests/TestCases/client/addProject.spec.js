import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";


test.only("add Project", async({page})=>{
    test.setTimeout(50000);
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    await login.Client_login();

    const add =  manager.getaddProject();
    const plp = manager.getPlpConfig();
    await add.clickAddProject();
    await add.verifyAddprojectURL();
    await add.addProjectLogo();
    await add.addBannerImg();

    const {Project_Name,ProType} = await add.addProjectDetails();
    await add.saveProject_NAMEandTYPE_inJSON(Project_Name,ProType);
    await add.verifyProjectOnDashboard(Project_Name,ProType);
});




      
  