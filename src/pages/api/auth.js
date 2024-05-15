const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const db = require("monk")("mongodb://localhost:27017/pos");
const users = db.get("users");

// // Save Profile Image on SignUp #mongodb
// router.post("/saveProfileImage", upload.single('image'), (req, res) => {
//     console.log(req.file)
// });

//Log in #mongodb
router.post("/logIn", (req, res) => {
  const userDetails = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log(userDetails.username);
  console.log(userDetails.password);

  users.find({ username: userDetails.username }).then((doc) => {
    const account = doc[0];
    if (account) {
      if (userDetails.password === account.password) {
        console.log("user logged in");
        res.json({
          success: true,
          message: "Log In Successful",
          user: {
            userId: account.id,
            username: account.username,
            businessname: account.businessname,
            logo: account.logo,
          },
        });
      } else {
        res.json({ success: false, message: "Invalid Password", user: null });
      }
    } else {
      res.json({ success: false, message: "User does not exist", user: null });
    }
  });
});

//Update Details #mongodb
router.post("/updateDetails", upload.single("logo"), (req, res) => {
  const userDetails = {
    username: req.body.username,
    businessname: req.body.businessname,
    logo: req.file,
    imageChanged: req.body.imageChanged,
  };

  console.log(userDetails.logo);

  users.find({}).then((doc) => {
    const account = doc[0];
    users
      .update(
        { id: "1234567890" },
        {
          $set: {
            username: userDetails.username,
            businessname: userDetails.businessname,
            logo:
              userDetails.imageChanged === "true"
                ? userDetails.logo
                : account.logo,
          },
        }
      )
      .then((doc) => {
        users.find({}).then((doc) => {
          res.json({
            success: true,
            message: "Log In Successful",
            user: {
              userId: doc[0].id,
              username: doc[0].username,
              businessname: doc[0].businessname,
              logo: doc[0].logo,
            },
          });
        });
      });
  });
});

//Change Password #mongodb
router.post("/changePassword", (req, res) => {
  const details = {
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  };


  users.find({}).then((doc) => {
    const account = doc[0];
    if (account.password === details.currentPassword) {
      users
        .update(
          { id: "1234567890" },
          {
            $set: {
              password: details.newPassword,
            },
          }
        )
        .then(() => {
          res.json({
            success: true,
            message: "Password Changed",
            result: [],
          });
        })
        .catch((err) => {
          res.json({
            success: false,
            message: "Could not change password",
            result: [],
          });
        });
    } else {
      res.json({
        success: false,
        message: "Current Password is incorrect",
        result: [],
      });
    }
  });
});

module.exports = router;
