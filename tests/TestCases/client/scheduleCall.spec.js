import {test} from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods"; 

test("schedule call test", async ({page})=>{
      const manager = new PageObjectManager(page);
      const login = manager.getLoginPage();
      const add = manager.getaddProject();
      const bento = manager.getProjectBentos();
      const schedule = manager.getScheduleCall();
      
      await login.Client_login();
      await methods.waitFor_and_Click(add.btn_config);
      await bento.bentoGrid_ScheduleCall();
      await schedule.setInitialTime();
      await schedule.setEndTime();
      await schedule.setDuration();
      await schedule.saveSchedule();
});