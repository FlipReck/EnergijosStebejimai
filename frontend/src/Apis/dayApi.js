import Api from "./api";

export default class dayApi extends Api {
  getAll = () => {
    return super.init().get(`getAllDays`);
  };
  getDaySchedules = () => {
    return super.init().get(`getAllDaySchedule`);
  };
  // get = () => {
  //   return super.init().get(`getDay/:id`);
  // };
}