import Api from "./api";

export default class timeApi extends Api {
  getAll = () => {
    return super.init().get(`times`);
  }
}