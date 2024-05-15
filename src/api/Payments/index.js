import { API_URL } from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";

class PaymentsApi {
  async getPayments() {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`${API_URL.FETCH_PAYMENTS}`).then((res) => {
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

  async generatePaymentCode() {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`${API_URL.GENERATE_PAYMENT_CODE}`).then((res) => {
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

export const paymentsApi = new PaymentsApi();
