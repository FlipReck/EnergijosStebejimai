import Api from "./api"

export default class weekApi extends Api {
    getAllWeeks = () => {
        return super.init().get(`weeks`);
    }

    getOneWeek = (id) => {
        return super.init().get(`weeks/${id}`);
    }

    postWeek = (data) => {
        return super.init().post(`weeks`, {
            weekNumber: data.weekId,
            isActive: data.isActive,
            room: data.room
        });
    }

    // updateWeek = (data) => {
    //     return super.init().put(`weeks/${data.id}`, {
    //         isActive: data.isActive,
    //         room: data.room
    //     }, 
    //     {
    //         headers: {
    //           'Content-Type': '*'
    //         }
    //       });
    // }

    // deleteWeek = (id) => {
    //     return super.init().delete(`weeks/${id}`);
    // }
  }