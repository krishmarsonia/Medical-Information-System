const express = require("express");

const { check } = require("express-validator/check");

const app = express();

const medicinename = require("../controllers/medical-name");
const mediControll = require("../controllers/medi-controll");

const path = require("path");

const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "krinix");

router.get("/", mediControll.option);

router.get("/index", mediControll.index);

router.use("/medicine_search", medicinename.medicine_search);

router.use("/add-medicine", mediControll.addmedicine);

router.post(
  "/adds-medicine",
  [
    check("title").isLength({min: 3}).trim().withMessage('enter title'),
    check("imageUrl").isURL().trim(),
    check("manufacturer").isLength({min: 3}).trim(),
    check("sc").isLength({min: 3}).trim(),
    check('uses').isLength({min: 3}).trim(),
    check('price').isFloat()
  ],
  mediControll.addsmedicine
);

router.use("/my-choice", mediControll.mychoice);

router.use("/condition", mediControll.condition);

router.get("/edit-medicine/:MedicineId", mediControll.getEditMedicine);

router.get("/delete-medicine/:MedicineId", mediControll.getDelete);

router.use("/delete-medicines/:MedcicneId", mediControll.postDelete);

router.post("/edit-medicine", [
    check("title").isLength({min: 3}).trim().withMessage('enter title'),
    check("imageUrl").isURL().trim(),
    check("manufacturer").isLength({min: 3}).trim(),
    check("sc").isLength({min: 3}).trim(),
    check('uses').isLength({min: 3}).trim(),
    check('price').isFloat()
  ] ,mediControll.postEditMedicine);

module.exports = router;
// exports.routes = router;
// exports.medicine = medicine;
