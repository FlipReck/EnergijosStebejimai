import Api from "./api";

export default class timeApi extends Api {
  getAll = () => {
    return super.init().get(`times`);
  }

  getDayTimes = (id) => {
    return super.init().get(`/days/${id}/times`);
}
}