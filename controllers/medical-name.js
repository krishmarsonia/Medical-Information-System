exports.medicine_search = (req, res, next) => {
  console.log("Medicine Name: ", req.body.Medicine_name);
  const test = req.body.Medicine_name;
  res.redirect('/search/'+ test);
};

