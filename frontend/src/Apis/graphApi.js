import Api from "./api";

export default class graphApi extends Api {
  getHourGraph = () => {
    return super.init().get(`getHourGraph`);
  };
}