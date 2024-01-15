const express = require("express");
const router_bssr = express.Router();
const companyController = require("./controllers/companyController");
const productController = require("./controllers/productController");
const uploader = require("./utils/upload-multer")

/**********************************
 *         BSSR  EJS             *
 **********************************/

router_bssr.get("/", companyController.home);
router_bssr
    .get("/signup", companyController.getSignupMyCompany)
    .post(
        "/sign-up",
        uploader("members").single("company_img")
        , companyController.signupProcess);

router_bssr
    .get("/login", companyController.getLoginMyCompany)
    .post("/login", companyController.loginProcess);

router_bssr.get("/logout", companyController.logout);
router_bssr.get("/check-me", companyController.checkSessions);

router_bssr.get("/products/menu", companyController.getMyCompaniesProducts);

router_bssr.post("/products/create",
    companyController.validateAuthCompany,
    uploader("products").array("product_images", 5),
    productController.addNewProduct
);
router_bssr.post("/products/edit/:id",   // oxirida : nupqda bolsa param xisoblanadi
    companyController.validateAuthCompany,
    productController.updateChosenProduct);

router_bssr.get("/all-restaurant",
    companyController.validateAdmin,
    companyController.getAllCompanies);


router_bssr.post(
    "/all-restaurant/edit",
    companyController.validateAdmin,
    companyController.updateCompanyByAdmin
);



// export router
module.exports = router_bssr;

