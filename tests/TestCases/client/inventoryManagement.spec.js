import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import data from "../../../Test_data/userDetails.json";
import { methods } from "../../utils/methods";

test("inventory management test", async ({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const add = manager.getaddProject();
    const bento = manager.getProjectBentos();
    const invent = manager.getInventoryManagement();

    await login.loginUser(data.clientDetails.email, data.clientDetails.pin);
    await methods.waitFor_and_Click(add.btn_config);
    await bento.bentoGrid_inventoryManagement();
    await invent.enterTotalArea();
    await invent.amountSqFt();
    await invent.minAmount();
    await invent.saveInventory();
})