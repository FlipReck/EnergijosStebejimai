import Api from "./api";

export default class dayApi extends Api {
  getAll = () => {
    return super.init().get(`getAllDays`);
  };
  get = (id) => {
    return super.init().get(`getDay/${id}`);
  };
}