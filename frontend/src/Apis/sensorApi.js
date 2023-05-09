import Api from "./api";

export default class sensorApi extends Api {
    getAllAccommodationSensors = () => {
        return super.init().get(`sensors`);
      };
  
    getAccommodationSensors = (id) => {
    return super.init().get(`accommodations/${id}/sensors`);
  };

  postAccommodationSensor = (id, sensorId) => {
    return super.init().post(`/accommodations/${id}/sensors`, {sensorId: sensorId});
  };

  updateAccommodationSensor = (accommodationId, sensorId, newSensorId) => {
    return super.init().post(`/accommodations/${accommodationId}/sensors/${sensorId}`, {sensorId: newSensorId});
  };

  deleteAccommodationSensor = (accommodationId, sensorId) => {
    return super.init().delete(`/accommodations/${accommodationId}/sensors/${sensorId}`);
  };




}