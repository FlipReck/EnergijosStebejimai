import Api from "./api";

export default class accommodationApi extends Api {
  getAllAccommendation = () => {
    return super.init().get(`getAllAccommendation`);
  };
  getAccommendation = (id) => {
    return super.init().get(`getAccommendation/${id}`);
  };
  getAllDevices = (id) => {
    return super.init().get(`getAllDevices/${id}`);
  };
  getSchedule = (id) => {
    return super.init().get(`getSchedule/${id}`);
  };
}