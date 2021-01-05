const express = require('express');

const path = require('path');

const router = express.Router();

router.use("/aboutus", (req, res, next) => {
    res.render('aboutus', {pageTitle: 'About us'});
  });

module.exports = router;