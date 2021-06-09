// const { session } = require("express-session");

const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator/check");

const User = require("../models/user");

const medicine = require("../models/medicine");

exports.getlogin = (req, res, next) => {
  // console.log(req.get('Cookie').split('=')[1]);
  // const loggedIn = req.get('Cookie').split('=')[1];
  // console.log(req.session.isloggedIn);

  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("login", {
    errorMessage: message,
    pageTitle: "Login page",
    isAuthenticated: false,
    oldInput:{
      email: '',
      password: ''
    },
    validationError: null
  });
};

exports.postlogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render("login", {
      errorMessage: errors.array()[0].msg,
      pageTitle: "Login page",
      isAuthenticated: false,
      oldInput:{
        email: email,
        password: password
      },
      validationError: errors.array()[0].param
    });
  }
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        // req.flash("error", "Invalid email or password");
        // // return res.redirect("/login");
        // let message = req.flash("error");
        // if (message.length > 0) {
        //   message = message[0];
        // } else {
        //   message = null;
        // }
        return res.render("login", {
          errorMessage: 'invalid email or password',
          pageTitle: "Login page",
          isAuthenticated: false,
          oldInput:{
            email: email,
            password: password
          },
          validationError: null
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((MatchedPassword) => {
          if (MatchedPassword) {
            req.session.isloggedIn = true;
            req.session.user = user;
            req.session.isAdmin = user.admin;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
        //   req.flash("error", "Wrong password");
        // // return res.redirect("/login");
        // let message = req.flash("error");
        // if (message.length > 0) {
        //   message = message[0];
        // } else {
        //   message = null;
        // }
        return res.render("login", {
          errorMessage: 'Wrong Password',
          pageTitle: "Login page",
          isAuthenticated: false,
          oldInput:{
            email: email,
            password: password
          },
          validationError: 'password'
        });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getSignup = (req, res, next) => {
  res.render("signup", {
    pageTitle: "SignUp page",
    isAuthenticated: false,
    errorMessage: req.flash("error")[0],
    oldInput:{
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationError: null
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0].param);
    return res.status(422).render("signup", {
      pageTitle: "SignUp page",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInput:{
        email: email,
        password: password,
        confirmPassword: confirmPassword
      },
      validationError: errors.array()[0].param
    });
  }
  User.findOne({ where: { email: email } })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "User already exist");
        let message = req.flash("error");
        if (message.length > 0) {
          message = message[0];
        } else {
          message = null;
        }
        return res.render("signup", {
          pageTitle: "SignUp page",
          isAuthenticated: false,
          errorMessage: message,
          oldInput: {
            email: email,
            password: password,
            confirmPassword: confirmPassword
          },
          validationError: null
        });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        User.create({
          email: email,
          password: hashedPassword,
        }).then((result) => {
          console.log("user signed up successfully");
          return res.redirect("/login");
        });
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postlogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    console.log("logged out successfully");
    res.redirect("/");
  });
};
