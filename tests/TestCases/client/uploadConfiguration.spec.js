import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";

test("upload configuration test", async ({browser,page})=>{
    test.setTimeout(180000);
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const add = manager.getaddProject();
    const bento = manager.getProjectBentos();
    const upload = manager.getUploadConfig();

    await login.Client_login();
    await methods.waitFor_and_Click(add.btn_config);
    await bento.bentoGrid_documents();
    await upload.uploadAgreements_sale();
    await upload.uploadAgreements_lease();
    await upload.uploadAgreements_ama();
    await upload.uploadAgreements_spoa();
    await upload.uploadLegal();
    await upload.onSaving();
});