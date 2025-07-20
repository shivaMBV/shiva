import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";

test("kyc individual test", async({page})=>{
    test.setTimeout(600000);
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const shell = manager.getCustomershell_dash();
    const properties = manager.getProperties();
    const manage =  manager.getManageAccounts();
    const bento = manager.getkycbento();
    const basic = manager.getbasicDetails();
    const profession = manager.getProfessionalDetails();
    const bank = manager.getPanDetails();
    const auth = manager.getAuthorizePerson();

    await login.Customer_login();
    await methods.waitFor_and_Click(shell.ln_properties);
    await page.waitForTimeout(2000);
    const valid = await properties.textVerification();
    if(valid){
        await page.waitForTimeout(1500);
        await properties.btn_startKYC.click();
    }
    else{
        await methods.waitFor_and_Click(shell.ln_manage_accounts);
    }
    await manage.clickOn_ManageAccounts();
    await bento.clickOn_kyc_individual();
    await basic.uploadProfileImage();
    await basic.select_Relation();
    await basic.personalDetails();
    if(basic.resident === "RI")
    {
        await basic.aadharDetails();
        await basic.currentAddress();
        await basic.sameAsCurrentAddress();
    }
    else if(basic.resident === "NRI")
    { 
        await basic.passportDetails();
        await basic.aadharDetails();
        await basic.currentAddress();
        await basic.overseasAddress();
    }

    //await basic.onClickSave();
    await page.locator("//span[text()='Professional Details']").click();

    if(basic.resident === "RI")
        {
            await profession.professionDetails();
        }
    else if(basic.resident === "NRI")
        { 
            const Profession = await profession.professionDetails();
            if(Profession === "Retired"){
                //await basic.onClickSave();
            }
            else if(Profession === "MNC"){
                await profession.professionDetails();
                await profession.proofOFNRI();
            }
        }
    //await basic.onClickSave();
    await page.locator("//span[text()='PAN & Bank details']").click();

    if(basic.resident === "RI")
        {
            await bank.panDetails();
            await bank.bankDetails();
        }
    else if(basic.resident === "NRI")
        { 
            await bank.panDetails();
            await bank.bankDetails();
            //await basic.onClickSave();
            await page.locator("//span[text()='Authorized Person']").click();
            await auth.authorizedPersonDetails();
        }
        await page.waitForTimeout(2000);
        await bank.clickOnFinishKYC();
        
        
///Kyc Details Updated Successfully

    






    await page.pause();
})
