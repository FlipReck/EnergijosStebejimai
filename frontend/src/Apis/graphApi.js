import Api from "./api";

export default class graphApi extends Api {
  getHourGraph = (id, date) => {
    return super.init().get(`getHourGraph?id=${id}&date=${date}`);
  };
  getDayGraph = (id, date) => {
    return super.init().get(`getDayGraph?id=${id}&date=${date}`);
  };
  getMonthGraph = (id, date) => {
    return super.init().get(`getMonthGraph?id=${id}&date=${date}`);
  };
}