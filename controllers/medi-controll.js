const Medicine = require("../models/medicine");

const { validationResult } = require("express-validator/check");

const user = require("../models/user");

// const medicine = [];

exports.option = (req, res, next) => {
  res.render("option", {
    pageTitle: "Home-Page",
    isAuthenticated: req.session.isloggedIn,
    istheAdmin: req.session.isAdmin,
  });
};

exports.index = (req, res, next) => {
  Medicine.findAll()
    .then((product) => {
      res.render("index", {
        pageTitle: "Index Page",
        medic: product,
        isAuthenticated: req.session.isloggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  // Medicine.fetchall().then(([rows, dataFields]) => {

  // }).catch(err => console.log(err));
};

exports.addmedicine = (req, res, next) => {
  res.render("add-medicine", {
    pageTitle: "Add medicine page",
    isAuthenticated: req.session.isloggedIn,
    oldInput: {
      title: "",
      imageUrl: "",
      manufacturer: "",
      sc: "",
      uses: "",
      price: "",
    },
    errorMessage: null,
    validationError: "",
  });
};
exports.addsmedicine = (req, res, next) => {
  const errors = validationResult(req);
  // medicine.push({ medicine: req.body.medicine });
  // console.log(req.body.medicine);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const manufacturer = req.body.manufacturer;
  const sc = req.body.sc;
  const uses = req.body.uses;
  const price = req.body.price;
  const userId = req.session.user.id;
  if (!errors.isEmpty()) {
    return res.status(422).render("add-medicine", {
      pageTitle: "Add medicine page",
      isAuthenticated: req.session.isloggedIn,
      oldInput: {
        title: title,
        imageUrl: imageUrl,
        manufacturer: manufacturer,
        sc: sc,
        uses: uses,
        price: price,
      },
      errorMessage: errors.array()[0].msg,
      validationError: errors.array()[0].param,
    });
  }

  Medicine.create({
    title: title,
    imageUrl: imageUrl,
    manufacturer: manufacturer,
    sc: sc,
    uses: uses,
    price: price,
    userId: userId,
  })
    .then((result) => {
      console.log("product created");
      res.redirect("/Medicine-list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditMedicine = (req, res, next) => {
  const MedId = req.params.MedicineId;
  Medicine.findByPk(MedId)
    .then((medicine) => {
      console.log(medicine);
      if (!medicine) {
        return res.redirect("/");
      }
      res.render("edit-medicine", {
        pageTitle: "edit-page",
        medicine: medicine,
        isAuthenticated: req.session.isloggedIn,
        errorMessage: null,
        validationError: "",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditMedicine = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(req.body.ProductId);
  var values = {
    id: req.body.ProductId,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    manufacturer: req.body.manufacturer,
    sc: req.body.sc,
    uses: req.body.uses,
    price: req.body.price,
  };

  if (!errors.isEmpty()) {
    return res.status(422).render("edit-medicine", {
      pageTitle: "edit-page",
      medicine: values,
      isAuthenticated: req.session.isloggedIn,
      errorMessage: errors.array()[0].msg,
      validationError: errors.array()[0].param,
    });
  }

  const userid = req.session.user.id;

  var condition = {
    where: { id: values.id, userId: userid },
  };
  options = { multi: true };

  Medicine.update(values, condition, options)
    .then((medi) => {
      if (medi[0] == 0) {
        console.log("UserId or MedicineId didn't match");
      } else {
        console.log("Medicine updated successfully");
      }
      // console.log('Yessss!!!!');
      res.redirect("/Medicine-list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDelete = (req, res, next) => {
  const medicalid = req.params.MedicineId;
  res.redirect("/delete-medicines/" + medicalid);
};

exports.postDelete = (req, res, next) => {
  const medicineID = req.params.MedcicneId;
  Medicine.destroy({
    where: {
      id: medicineID,
      userId: req.session.user.id,
    },
  })
    .then((result) => {
      if (result == 0) {
        console.log("UserId or medicineId didn't match");
      } else {
        console.log("Deleted successfully");
      }

      res.redirect("/Medicine-list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.mychoice = (req, res, next) => {
  res.redirect("/paracetamol-medicine"); //so in this way we can redirect not only from html but from js also.
};
exports.medicine_list = (req, res, next) => {
  // const modi = mediadd.medicine;
  Medicine.findAll()
    .then((products) => {
      res.render("medicine-list", {
        pageTitle: "medicine list",
        medic: products,
        isAuthenticated: req.session.isloggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.medicine_Details = (req, res, next) => {
  const prodId = req.params.ProductId;
  Medicine.findByPk(prodId)
    .then((product) => {
      // console.log(product)
      res.render("medicine-details", {
        pageTitle: "Medicine-details",
        product: product,
        isAuthenticated: req.session.isloggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.search = (req, res, next) => {
  const productTitle = req.params.ProductTitle;
  Medicine.findAll({
    where: {
      "$medicine.title$": productTitle,
    },
  })
    .then((product) => {
      res.render("medicine-details", {
        pageTitle: "Medicine-Details",
        product: product[0],
        isAuthenticated: req.session.isloggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
//   Medicine.findByTitle(productTitle).then(([product])=> {

//   }).catch(err => console.log(err))
// }
exports.condition = (req, res, next) => {
  res.render("condition", {
    pageTitle: "Condition-sub",
    isAuthenticated: req.session.isloggedIn,
  });
};
