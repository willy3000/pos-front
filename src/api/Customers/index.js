import { API_URL } from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";

class CustomersApi {
  async addCustomer(values) {
    const data = {
      name: values.name,
      phoneNumber: values.phoneNumber,
    };

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.CREATE_CUSTOMER}`, data)
          .then((res) => {
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
  async getCustomers() {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get(`${API_URL.FETCH_CUSTOMERS}`).then((res) => {
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

export const customersApi = new CustomersApi();
