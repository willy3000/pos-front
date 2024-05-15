import { headers } from "../../../next.config";
import { API_URL } from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";

class AuthApi {
  async signUp(values) {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      image: values.image,
      email: values.email,
      password: values.password,
    };

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`${API_URL.SIGN_UP}`, data).then((res) => {
          if (res.data.success) {
            resolve(res.data.message);
          } else {
            reject(new Error(res.data.error));
          }
        });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  async saveProfileImage(image, userId) {
    const formData = new FormData();
    formData.append("image", image);

    console.log('imageuserid', userId)

    return new Promise(async (resolve, reject) => {
      await axiosInstance
        .post(`${API_URL.SAVE_PROFILE_IMAGE}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {});
    });
  }

  async logIn(values) {
    const data = {
      username: values.username,
      password: values.password,
    };

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`${API_URL.LOG_IN}`, data).then((res) => {
          if (res.data.success) {
            resolve(res.data);
          } else {
            reject(new Error(res.data.message));
          }
        });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  async updateDetails(values, imageFile, imageChanged) {
    const data = {
      username: values.username,
      businessname: values.businessname,
      imageChanged: imageChanged
    };

    const formData = new FormData();

    formData.append("logo", imageFile);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.UPDATE_DETAILS}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.success) {
              resolve(res.data.user);
            } else {
              reject(new Error(res.data.error));
            }
          });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }


  async changePassword(values) {
    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };


    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.CHANGE_PASSWORD}`, data)
          .then((res) => {
            if (res.data.success) {
              resolve(res.data);
            } else {
              reject(new Error(res.data.message));
            }
          });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }
}

export const Auth = new AuthApi();
