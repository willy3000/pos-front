export const BASE_URL = "http://localhost:5000";
// export const BASE_URL = 'http://2e3b-41-90-70-188.ngrok-free.app'
// export const BASE_URL = 'https://ad1e-41-90-70-188.ngrok-free.app/'
//  export const BASE_URL = 'https://3adc-41-90-68-188.ngrok-free.app'
//  export const BASE_URL = 'http://30a9-41-90-68-188.ngrok-free.app'
import { toast } from "react-toastify";

export const SUBSCRIPTION_PRICE = 2000;

export const API_URL = {
  //Authentication
  SIGN_UP: "/api/auth/signUp",
  LOG_IN: "/api/auth/logIn",
  SAVE_PROFILE_IMAGE: "/api/auth/saveProfileImage",
  CHANGE_PASSWORD: "/api/auth/changePassword",

  //Pojects
  CREATE_PROJECT: "/api/projects/addItem",
  EDIT_ITEM: "/api/projects/editItem",
  FECTH_PROJECT: "/api/projects/getProject",
  FECTH_PROJECTS: "/api/projects/getItems",
  FECTH_JOINED_PROJECTS: "/api/projects/getJoinedProjects",
  DELETE_PROJECT: "/api/projects/deleteItem",
  JOIN_PROJECT: "/api/projects/joinProject",
  ADD_PARTICIPANT: "/api/projects/addParticipant",
  FETCH_PARTICIPANTS: "/api/projects/getParticipants",
  FETCH_USER_EMAILS: "/api/projects/getUserEmails",
  CREATE_EVENT: "/api/projects/addEvent",
  FETCH_EVENTS: "/api/projects/getEvents",
  DELETE_EVENT: "/api/projects/deleteEvent",
  MAKE_SALE: "/api/projects/makeSale",

  //Sales
  FETCH_SALES: "/api/projects/getSales",

  //Reports
  FETCH_REPORTS: "/api/projects/getReport",

  //Payments
  GENERATE_PAYMENT_CODE: "api/projects/generateActivationCode",
  FETCH_PAYMENTS: "api/projects/getPayments",

  //Profile
  UPDATE_DETAILS: "api/auth/updateDetails",

  //Dashboard
  FETCH_SUMMARY: "api/projects/getSummary",

  //Customers
  FETCH_CUSTOMERS: "api/projects/getCustomers",
  CREATE_CUSTOMER: "api/projects/addCustomer",
};

//funcs
export const getInitials = (name = "") => {
  return name
    ?.replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const generateRandomProjectImage = () => {
  while (true) {
    const randomNum = Math.floor(Math.random() * (7 - 0 + 1));
    if (randomNum === prevImage) {
      // console.log('continued')
      continue;
    } else {
      // console.log('broken')
      prevImage = randomNum;
      return randomNum;
    }
  }
};

// export const showToast = (openSuccess, openError, setMessage, type, message) => {
//   setMessage(message)
//   if(type === 'success'){
//     openSuccess(true)
//   }else{
//     openError(true)
//   }
// }

//in progress
export const loader = async (loadingMessage, successMessage, func) => {
  const loading = toast.loading(loadingMessage);
  await func;
  toast.dismiss(loading);
  toast.success(successMessage);
};


//bill color
export const getBillColor = (bill) => {
  if(bill===0){
    return null
  }
  if(bill>0){
    return 'green'
  }
  if(bill<0){
    return 'red'
  }
}


//backend variables
export const PAYMENT_SECRET_KEY = "Pos-Secret-key-123";

// module.exports = PAYMENT_SECRET_KEY
