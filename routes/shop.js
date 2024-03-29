const express = require("express");

const path = require("path");

const mediControll = require('../controllers/medi-controll');
const medicinename = require("../controllers/medical-name");

const app = express();

const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.use("/Medicine-list", mediControll.medicine_list);

router.use('/medicine/:ProductId',mediControll.medicine_Details);

router.use('/search/:ProductTitle',mediControll.search);

module.exports = router;
