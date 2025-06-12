import {methods} from "../../utils/methods";
import plpData from "../../../Test_data/Project_configuration.json";

export class ScheduleCallPage {

      constructor(page){
        this.page = page;
        this.addTime = page.locator("[id='6h2OdNpiLrKUMTVIM268XD']");
        this.endTime = page.locator("[id='4ZJIcVu3VWYEijqk8TbKU']");
        this.duration = page.locator("[id='koV7EeVStaUdgTgEWwBYx']");
        this.save = page.getByRole("button", {name : "Save & Continue"});
        this.label = page.locator("div._dropdownItem ._dropdownItemLabel");
    }

    async setInitialTime(){
        await methods.
        waitFor_and_Click(this.addTime);
        for(let i=0; i<await this.label.count(); i++){
            const time = this.label.nth(i);
            const label = await time.innerText();
            if(label === plpData.scheduleCallDetails.startTime){
                await time.click();
                break;
            }
        }
    }

    async setEndTime(){
        await methods.waitFor_and_Click(this.endTime);
        for(let i=0; i<await this.label.count(); i++){
            const time = this.label.nth(i);
            const label = await time.innerText();
            if(label === plpData.scheduleCallDetails.endTime){
                await time.click();
                break;
            }
        }
    }

    async setDuration(){
        await methods.waitFor_and_Click(this.duration);
        for(let i=0; i<await this.label.count(); i++){
            const duration = this.label.nth(i);
            const label = await duration.innerText();
            if(label === plpData.scheduleCallDetails.duration)
                await duration.click(); 
                break;
        }
    }

    async saveSchedule(){
        await this.save.click();
        await methods.validateText(this.page, "Schedule Call Configuration details Updated Successfully");
    }
}