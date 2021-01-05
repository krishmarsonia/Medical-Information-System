const express = require("express");

const app = express();

const medicinename = require("../controllers/medical-name");
const mediControll = require('../controllers/medi-controll');

const path = require("path");

const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "krinix");



router.get("/", mediControll.option);

router.get("/index", mediControll.index);

router.use("/Paracetamol", medicinename.paracetamol);

router.use("/Atarax", medicinename.Atarax);

router.use("/medicine_search", medicinename.medicine_search);

router.use("/add-medicine", mediControll.addmedicine);

router.use("/adds-medicine", mediControll.addsmedicine);

router.use("/my-choice", mediControll.mychoice);

module.exports = router;
// exports.routes = router;
// exports.medicine = medicine;
