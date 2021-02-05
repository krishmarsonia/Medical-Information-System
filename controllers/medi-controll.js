const Medicine = require('../models/medicine');

// const medicine = [];

exports.option = (req, res, next) => {
  res.render("option", { pagetitle: "Home-Page" });
};

exports.index = (req, res, next) => {
  res.render("index", { pageTitle: "Index Page" });
};

exports.addmedicine = (req, res, next) => {
  res.render("add-medicine", { pageTitle: "Add medicine page" });
};
exports.addsmedicine = (req, res, next) => {
  // medicine.push({ medicine: req.body.medicine });
  // console.log(req.body.medicine);
  const medicine = new Medicine(req.body.medicine);
  medicine.save();
  res.redirect("/Medicine-list");
};
exports.mychoice = (req, res, next) => {
  res.redirect("/paracetamol-medicine"); //so in this way we can redirect not only from html but from js also.
};
exports.medicine_list = (req, res, next) => {
  // const modi = mediadd.medicine;
  Medicine.fetchall((medicine) => {
    res.render("medicinelist", { PageTitle: "Medicine List", medic: medicine });
  });
  
};
