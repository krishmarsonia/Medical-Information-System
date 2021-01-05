const express = require("express");

const path = require("path");

const mediControll = require('../controllers/medi-controll');

const app = express();

const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.use("/Medicine-list", mediControll.medicine_list);

module.exports = router;
