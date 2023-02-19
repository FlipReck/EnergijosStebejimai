import Api from "./api";

export default class reportApi extends Api {
  getAll = () => {
    return super.init().get(`getAll`);
  };
}