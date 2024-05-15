import { useEffect, useState } from "react";
import { v4 } from "uuid";
import DataFetch from "./DataFetch";
import Cookies from "js-cookie";
import { useMounted } from "./useMounted";

export default function useUserActivityTracker() {


  // const [user, setUser] = useState(userCookie)
  let user = FetchUser();
  console.log("the user is", user);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleLinkClick);
    // document.addEventListener('submit', handleFormSubmit);

    // Cleanup function
    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleLinkClick);
      // document.removeEventListener('submit', handleFormSubmit);
    };
  }, []);
  // Page dimensions

  function getPageDimensions() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    saveOnce("screenSize", `Height: ${screenHeight}px Width: ${screenWidth}`);
  }

  function deviceType() {
    let userAgent = navigator.userAgent;
    saveOnce("deviceType", userAgent);
  }

  //Define event handlers
  function handleScroll(event) {
    // Calculate scroll depth and save activity
    const scrollDepth = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );
    saveActivity("scroll_depth", scrollDepth + "%");
    console.log(scrollDepth);
  }

  function handleLinkClick(event) {
    const target = event.target;
    if (target.tagName === "A") {
      saveActivity("button_click", target.href);
    }
  }

  // function handleFormSubmit(event) {
  //     const form = event.target;
  //     if (form.tagName === 'FORM') {
  //         const formData = new FormData(form);
  //         const searchData = formData.get('search');
  //         if (searchData) {
  //         saveActivity('search_term', searchData);
  //         }
  //     }
  // }

  //Save activity
  // function saveActivity(action, data) {
  //     const transaction = db.transaction('UserActivityStore', 'readwrite');
  //     const store = transaction.objectStore('UserActivityStore');
  //     const activity = { timestamp: new Date(), action, data };
  //     store.add(activity);
  // }

  function saveActivity(action, data) {
    const key = `${action}`;
    if (key in user) {
      let value = [...user[key], data];
      user[key] = value;
    } else {
      user[key] = [];
    }
    //Update user in db
    try {
      DataFetch(`/users/${user.username}`, "PATCH", user);
    } catch (e) {
      console.error("Error:", e);
    }
  }

  function FetchUser() {
    //Check for cookie
    let user = Cookies.get("userInfo");
    if (!user) {
      user = JSON.stringify(user);
      return user;
    }
    return JSON.parse(user);
  }

  function generate_v_obj() {
    let v_obj;
    try {
      v_obj = JSON.parse(localStorage.getItem("v_obj"));
    } catch (err) {}
    if (!v_obj) {
      let v_obj = {};
      v_obj.username = v4();
      localStorage.setItem("v_obj", JSON.stringify(v_obj));
      v_obj = JSON.parse(localStorage.getItem("v_obj"));
    }
    return v_obj;
  }

  function saveOnce(action, data) {
    const key = `${action}`;
    if (key in user) {
      user[key] = data;
    } else {
      user[key] = "";
    }
    //Update user in db
    try {
      DataFetch(`/users/${user.username}`, "PATCH", user);
    } catch (e) {
      console.error("Error:", e);
    }
  }
  deviceType();
  getPageDimensions();
}
