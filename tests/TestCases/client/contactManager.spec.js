import { test } from "@playwright/test";
import userData from "../../../Test_data/userDetails.json";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";

test("contact manager test", async ({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const bento = manager.getProjectBentos();
    const contact = manager.getContactManager();
    const add = manager.getaddProject();

    await login.loginUser(userData.clientDetails.email,userData.clientDetails.pin);
    await methods.waitFor_and_Click(add.btn_config);
    await bento.bentoGrid_contactManager();
    await contact.enterName();
    await contact.enterEmail();
    await contact.enterPhone();
    await contact.uploadImage();
    await contact.onSaving();
    await contact.verifyToastMSG();
});