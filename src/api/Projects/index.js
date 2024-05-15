import { API_URL } from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";

class ProjectsApi {
  async createProject(values, imageFile) {
    const data = {
      name: values.name,
      quantity: values.quantity,
      price: values.price,
    };

    const formData = new FormData();

    formData.append("imageFile", imageFile);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.CREATE_PROJECT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
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

  async editItem(values, imageFile, imageChanged) {
    const data = {
      id: values.id,
      name: values.name,
      quantity: values.quantity,
      price: values.price,
      imageChanged: Boolean(imageChanged)
    };

    const formData = new FormData();

    formData.append("imageFile", imageFile);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.EDIT_ITEM}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
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

  async makeSale(values) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.MAKE_SALE}`, { ...values })
          .then((res) => {
            if (res.data.success) {
              resolve(res.data);
            } else {
              reject(new Error(res.data.error));
            }
          });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  async getProjects() {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get(`${API_URL.FECTH_PROJECTS}`).then((res) => {
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

  async getJoinedProjects(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .get(`${API_URL.FECTH_JOINED_PROJECTS}/${userId}`)
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

  async getProject(projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .get(`${API_URL.FECTH_PROJECT}/${projectId}`)
          .then((res) => {
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

  async getUserEmails() {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get(`${API_URL.FETCH_USER_EMAILS}`).then((res) => {
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

  async deleteProject(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.DELETE_PROJECT}/${id}`)
          .then((res) => {
            if (res.data.success) {
              resolve(res.data.message);
            } else {
              reject(new Error(res.data.message));
            }
          });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  async joinProject(userId, code) {
    const data = {
      code: code,
    };

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.JOIN_PROJECT}/${userId}`, data)
          .then((res) => {
            if (res.data.success) {
              resolve(res.data.message);
            } else {
              reject(new Error(res.data.message));
            }
          });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  async addParticipant(email, projectId) {
    console.log("projectId", projectId);
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.ADD_PARTICIPANT}/${email}/${projectId}`)
          .then((res) => {
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
  async addEvent(projectId, userId, values) {
    const data = {
      eventName: values.eventName,
      eventDate: values.eventDate,
      eventTime: values.eventTime,
      description: values.description,
      link: values.link,
    };
    console.log(data);

    console.log("projectId", projectId);
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.CREATE_EVENT}/${projectId}/${userId}`, data)
          .then((res) => {
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

  async getParticipants(userId, projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .get(`${API_URL.FETCH_PARTICIPANTS}/${userId}/${projectId}`)
          .then((res) => {
            console.log("response", res.data.result);
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

  async getEvents(projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .get(`${API_URL.FETCH_EVENTS}/${projectId}`)
          .then((res) => {
            console.log("response", res.data.result);
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

  async deleteEvent(projectId, eventId) {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance
          .post(`${API_URL.DELETE_EVENT}/${eventId}/${projectId}`)
          .then((res) => {
            if (res.data.success) {
              resolve(res.data.message);
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

export const projectsApi = new ProjectsApi();
