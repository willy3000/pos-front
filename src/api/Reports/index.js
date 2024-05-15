import { API_URL } from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";

class ReportsApi {
  async getReport() {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get(`${API_URL.FETCH_REPORTS}`).then((res) => {
          console.log("response", res);
          if (res.data.success) {
            resolve(res.data.result);
          } else {
            reject(new Error(res.data.message));
          }
        });
      } catch (err) {
        reject(new Error(err.message));
        // resolve([]);
      }
    });
  }
}

export const reportsApi = new ReportsApi();
