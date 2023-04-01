import Api from "./api";

export default class graphApi extends Api {
  getHourGraph = (id, date) => {
    return super.init().get(`getHourGraph?id=${id}&date=${date}`);
  };
}