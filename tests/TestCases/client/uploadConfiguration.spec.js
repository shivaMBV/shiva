import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import data from "../../../Test_data/userDetails.json";
import { methods } from "../../utils/methods";

test("upload configuration test", async ({browser,page})=>{
    test.setTimeout(180000);
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const add = manager.getaddProject();
    const bento = manager.getProjectBentos();
    const upload = manager.getUploadConfig();


    await login.loginUser(data.clientDetails.email, data.clientDetails.pin);
    await methods.waitFor_and_Click(add.btn_config);
    await bento.bentoGrid_documents();
    await upload.uploadAgreements();
    await upload.uploadLegal();
    await upload.onSaving();
});