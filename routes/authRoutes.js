const express = require("express");

const { check, body } = require("express-validator/check");

const app = express();

const authController = require("../controllers/auth-controller");

app.set("view engine", "ejs");
app.set("views", "krinix");

const router = express.Router();

router.get("/login", authController.getlogin);

router.post("/login",[
  check('email').isEmail().withMessage("Please enter a valid email").normalizeEmail(),
  check('password', 'Please enter a password having only alphabets and numbers atleast 5 characters long').isLength({min: 5}).isAlphanumeric().trim()
], authController.postlogin);

router.post("/logout", authController.postlogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    check("password", "Please enter a password with only numbers and text and atleast 5 characters long")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match");
      }
      return true;
    }).trim(),
  ],
  authController.postSignup
);

module.exports = router;
