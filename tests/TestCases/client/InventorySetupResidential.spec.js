import { test } from "@playwright/test";
import { methods } from "../../utils/methods";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { addProject } from "../../pages/ClientPages/addProjectPage";

test("residential", async ({ page }) => {
  test.setTimeout(500000);
  const manager = new PageObjectManager(page);
  const login = manager.getLoginPage();
  const add = manager.getaddProject();
  const bento = manager.getProjectBentos();
  const setup = manager.getInventroySetup();

  await login.Client_login();
  await methods.waitFor_and_Click(add.btn_config);
  await bento.bentoGrid_inventorySetUp();
  await setup.otherAttributes();
  await setup.unitConfiguration();
  await setup.PLCConfiguration();
  await setup.facingType();
  await page.pause();
});