import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";

test("contact manager test", async ({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const bento = manager.getProjectBentos();
    const contact = manager.getContactManager();
    const add = manager.getaddProject();

    await login.Client_login();
    await methods.waitFor_and_Click(add.btn_config);
    await bento.bentoGrid_contactManager();
    await contact.managerName();
    await contact.managerEmail();
    await contact.managerPhone();
    await contact.uploadImage();
    await contact.onSaving();
    await contact.verifyToastMSG();
});