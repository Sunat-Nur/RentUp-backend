
const express = require("express");
const router_bssr = express.Router();                   // expressni ichidan router olib chiqilyabdi
const companyController = require("./controllers/companyController");


/**********************************
 *         BSSR  EJS             *
 **********************************/
// ejs uchun,  anaaviy usul


// traditionda front-end da view ishlamaydi o'rniga json formatda ma'lumot boradi


router_bssr
    .get("/signup", companyController.getSignupMyCompany)  // async function ning callback methodan foydalanyabmiz
    .post("/signup", companyController.signupProcess);  // async function ning callback methodan foydalanyabmiz

// biri pageni obberadi biri run qiladi

router_bssr
    .get("/login", companyController.getLoginMyCompany)
    .post("/login", companyController.loginProcess);

router_bssr.get("/logout", companyController.logout);



// export router
module.exports = router_bssr;


