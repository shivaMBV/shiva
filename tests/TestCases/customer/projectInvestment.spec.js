import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";

test("Project investmet test", async ({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const customDash = manager.getCustomershell_dash();
    const add = manager.getaddProject();
    const properties = manager.getProperties();
    const shell = manager.getCustomershell_dash();
    
    await login.Customer_login();
    const dash = await customDash.verify_dashboard();
    if(dash){     // new user
        await page.waitForTimeout(4000);
        await shell.btn_exploreProperties.click();
        if(await properties.btn_viewDetails.isVisible()){
            await methods.waitFor_and_Click(properties.btn_viewDetails);
        }
        else{
            await page.waitForTimeout(4000);
            await shell.clickOn_Dashboard();
            //click on cost sheet for particular project
            //here need to write a code fo cost sheet
        }
    }
    else{    //existing user
        await shell.clickOn_properties();
        await page.waitForTimeout(4000);
        if(await properties.btn_viewDetails.isVisible()){
            await page.waitForTimeout(4000);
            await methods.waitFor_and_Click(properties.btn_viewDetails);
        }
        else{
            await shell.clickOn_Dashboard();
            //click on cost sheet for particular project
            //here need to write a code fo cost sheet
        }
    }
    await page.pause();
});