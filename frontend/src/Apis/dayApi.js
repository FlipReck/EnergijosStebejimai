import Api from "./api";

export default class dayApi extends Api {
  getAll = () => {
    return super.init().get(`getAllDays`);
  };

  getAvailableDays = () => {
    return super.init().get(`availableDays`);
  };

  // get = () => {
  //   return super.init().get(`getDay/:id`);
  // };
}