// import { PAYMENT_SECRET_KEY } from "../../constants";
const PAYMENT_SECRET_KEY = require("../../utils/constants");
const express = require("express");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(PAYMENT_SECRET_KEY);
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const db = require("monk")("mongodb://localhost:27017/pos");
const items = db.get("items");
const sales = db.get("sales");
const payments = db.get("payments");






//functions
//aggregate items in report
const aggregateItems = (groups) => {
  let newGroups = groups;
  let newItemsArray = [];
  Object.keys(groups).map((key, index) => {
    newItemsArray = [];
    groups[key].map((sale) => {
      sale.items.map((item) => {
        const foundItems = newItemsArray.filter((i) => i.id === item.id);
        // console.log("foundItems", foundItems);
        if (foundItems.length > 0) {
          const objIndex = newItemsArray.findIndex((obj) => obj.id === item.id);
          const updatedQuantity =
            newItemsArray[objIndex].quantity + item.quantity;
          // console.log('current quantity', newItemsArray[objIndex].quantity)
          // console.log('new quantity', item.quantity)
          // console.log('updated quantity', updatedQuantity)
          newItemsArray[objIndex].quantity = updatedQuantity;
        } else {
          newItemsArray.push(item);
          const objIndex = newItemsArray.findIndex((obj) => obj.id === item.id);
          // console.log("item pushed");
          // console.log(item.id);
          // console.log(newItemsArray[objIndex].id);
        }
        // console.log(newItemsArray)
      });
    });
    newGroups[key] = [...newItemsArray];
  });
  console.log(newGroups);
  return newGroups;
};


//get most sold item
const getMostSold = (groups) => {
console.log(groups)
};


//get sale today
const getTodaySales = (doc) => {
  const reversedDoc = doc.reverse();
  const date = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
  // console.log(date)
  groups = reversedDoc.reduce((groups, sale) => {
    const date = sale.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(sale);
    return groups
  }, {});
  // console.log(groups[date])
  return groups[date].length
}


















//Create Item #mongodb
router.post("/addItem", upload.single("imageFile"), (req, res) => {
  const itemDetails = {
    id: uuidv4(),
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    imageFile: req.file,
  };

  // console.log(req.file)
  // console.log(req.body.name)
  // console.log(req.body.price)
  // console.log(req.body.quantity)
  // console.log(req.body)

  try {
    items.insert({ ...itemDetails }).then(() => {
      db.close();
      res.json({ success: true, message: "Item Created" });
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//Add Logo #mongodb
router.post("/addLogo", upload.single("imageFile"), (req, res) => {
  const imageFile = req.file;

  try {
    logo.insert({ imageFile: imageFile }).then(() => {
      db.close();
      res.json({ success: true, message: "Logo Added" });
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//Edit Item #mongodb
router.post("/editItem", upload.single("imageFile"), (req, res) => {
  const itemDetails = {
    id: req.body.id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    imageFile: req.file,
    imageChanged: req.body.imageChanged,
  };

  // console.log(req.file)
  // console.log(req.body.name)
  // console.log(req.body.price)
  // console.log(req.body.quantity)
  // console.log(req.body)

  // try {
  //   items.insert({ ...itemDetails }).then(() => {
  //     db.close();
  //     res.json({ success: true, message: "Item Created" });
  //   });
  // } catch (err) {
  //   res.json({ success: false, message: err.message });
  // }

  console.log(itemDetails);

  try {
    items.findOne({ id: itemDetails.id }).then((doc) => {
      items.update(
        { id: itemDetails.id },
        {
          $set: {
            name: itemDetails.name,
            quantity: itemDetails.quantity,
            price: itemDetails.price,
            imageFile:
              itemDetails.imageChanged === "true"
                ? itemDetails.imageFile
                : doc.imageFile,
          },
        }
      );
    });

    // items.update({ id: itemDetails.id }, { $set: { ...itemDetails } });
    res.json({ success: true, message: "Item Updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.post("/deleteItem/:id", (req, res) => {
  const id = req.params.id;

  // console.log(req.file)
  // console.log(req.body.name)
  // console.log(req.body.price)
  // console.log(req.body.quantity)
  // console.log(req.body)

  try {
    items.remove({ id: id }).then(() => {
      db.close();
      res.json({ success: true, message: "Item Deleted" });
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//get items #mongodb
router.get("/getItems", (req, res) => {
  try {
    items.find({}).then((doc) => {
      res.json({
        success: true,
        message: "Items fetched",
        result: [...doc],
      });
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//get sales #mongodb
router.get("/getSales", (req, res) => {
  try {
    sales.find({}).then((doc) => {
      res.json({
        success: true,
        message: "Sales fetched",
        result: [...doc],
      });
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//Make Sale #mongodb
router.post("/makeSale", (req, res) => {
  const date = new Date(req.body.date).setUTCHours(0, 0, 0, 0);

  const saleDetails = {
    id: uuidv4(),
    items: req.body.items,
    datetime: req.body.date,
    date: new Date(date).toISOString(),
    paymentMethod: req.body.paymentMethod,
    subTotal: req.body.subTotal,
    discount: req.body.discount,
    total: req.body.total,
  };

  try {
    saleDetails.items.map((item) => {
      items.findOne({ id: item.id }).then((doc) => {
        items.update(
          { id: item.id },
          { $set: { quantity: doc?.quantity - item?.quantity } }
        );
      });
    });
    sales.insert({ ...saleDetails }).then(() => {});
    res.json({ success: true, message: "Sale Completed" });
  } catch (err) {
    res.json({ success: false, message: "sale failed" });
  }

  // try {
  //   items.insert({ ...itemDetails }).then(() => {
  //     db.close();
  //     res.json({ success: true, message: "Item Created" });
  //   });
  // } catch (err) {
  //   res.json({ success: false, message: err.message });
  // }
});


//Get Report #mongodb
router.get("/getReport", (req, res) => {
  // let groups;
  // try {
  //   sales
  //     .find({})
  //     .then((doc) => {
  //       groups = doc.reduce((groups, sale) => {
  //         const date = sale.date;
  //         if (!groups[date]) {
  //           groups[date] = [];
  //         }
  //         groups[date].push(sale);
  //         return groups;
  //       }, {});
  //       console.log(groups);
  //     })
  //     .then(() => {
  //       res.json({
  //         success: true,
  //         message: "Reports Fetched",
  //         result: groups,
  //       });
  //     });
  // } catch (err) {
  //   res.json({ success: false, message: "sale failed" });
  // }

  let groups;
  let aggregatedGroups;
  try {
    sales
      .find({})
      .then((doc) => {
        const reversedDoc = doc.reverse();
        groups = reversedDoc.reduce((groups, sale) => {
          const date = sale.date;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(sale);
          return groups;
        }, {});
        aggregatedGroups = aggregateItems(groups);
      })
      .then(() => {
        res.json({
          success: true,
          message: "Reports Fetched",
          result: aggregatedGroups,
        });
      });
  } catch (err) {
    res.json({ success: false, message: "sale failed" });
  }
});

//get sales #mongodb
router.get("/getSales", (req, res) => {
  try {
    sales.find({}).then((doc) => {
      res.json({
        success: true,
        message: "Sales fetched",
        result: [...doc],
      });
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//Generate Activation code #mongodb
router.post("/generateActivationCode", (req, res) => {
  const codeId = uuidv4();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const generateCode = () => {
    let code = "";
    for (let i = 0; i < 12; i++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    const encryptedCode = cryptr.encrypt(code);
    return encryptedCode;
  };

  try {
    payments
      .insert({
        id: codeId,
        dateGenerated: new Date(),
        status: 'pending',
        key: null,
        dateActivated: null,
        code: generateCode(),
        expiry: null
      })
      .then((doc) => {
        res.json({
          success: true,
          message: "Payment code generated",
          result: [],
        });
      });
  } catch (err) {
    res.json({
      success: false,
      message: "Failed",
      result: [],
    });
  }
});

//Get Payments #mongodb
router.post("/getPayments", (req, res) => {
  try {
    payments.find({}).then((doc) => {
      res.json({
        success: true,
        message: "Payments fetched",
        result: [...doc],
      });
    });
  } catch (err) {
    res.json({ success: false, message: "Failed", result: [...doc] });
  }
});

//Get Dashboard Summary #mongodb
router.get("/getSummary", (req, res) => {
  let itemsNum = 0;
  let salesNum = 0;
  let salesToday = 0;

  try {
    items.find({}).then((doc) => {
      itemsNum = doc.length;
      sales.find({}).then((doc) => {
        salesNum = doc.length;

        res.json({
          success: true,
          message: "summary fetched",
          result: [
            { id: 0, name: "All Time Sales", number: salesNum },
            { id: 1, name: "Sales Today", number: getTodaySales(doc) },
            { id: 2, name: "items", number: itemsNum },
          ],
        });
      });
    });
  } catch (err) {
    res.json({
      success: false,
      message: "summary failed",
      result: [],
    });
  }
});

module.exports = router;
