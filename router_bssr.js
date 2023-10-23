
const express = require("express");
const router_bssr = express.Router();
const companyController = require("./controllers/companyController");
const productController = require("./controllers/productController");
const {uploadProductImage} = require("./utils/upload-multer");


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
router_bssr.get("/check-me", companyController.checkSessions);



router_bssr.get("/products/menu", companyController.getCompanyData);
router_bssr.post("/products/create",
    companyController.validateAuthCompany,
    uploadProductImage.array("product_images", 5),
    productController.addNewProduct
);
router_bssr.post("products/edit/:id", productController.updateChosenProduct);


// export router
module.exports = router_bssr;


