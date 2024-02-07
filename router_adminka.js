const express = require("express");
const companyController = require("./controllers/companyController");
const productController = require("./controllers/productController");
const eventController = require("./controllers/eventController");
const uploader = require("./utils/upload-multer");
const router_adminka = express.Router();

/**********************************
 *         BSSR  EJS             *
 **********************************/

router_adminka.get("/", companyController.home);
router_adminka
    .get("/signup", companyController.getSignupMyCompany)
    .post(
        "/signup",
        uploader("members").single("company_img"),
        companyController.signupProcess);

router_adminka
    .get("/login", companyController.getLoginMyCompany)
    .post("/login", companyController.loginProcess);

router_adminka.get("/logout", companyController.logout);
router_adminka.get("/check-me", companyController.checkSessions);

router_adminka.get("/products/menu", companyController.getMyCompaniesProducts);

router_adminka.post("/products/create",
    companyController.validateAuthCompany,
    uploader("products").array("product_images", 5),
    productController.addNewProduct
);
router_adminka.post("/products/edit/:id",   // oxirida : nupqda bolsa param xisoblanadi
    companyController.validateAuthCompany,
    productController.updateChosenProduct);

router_adminka.get("/all-company",
    companyController.validateAdmin,
    companyController.getAllCompany);


router_adminka.post(
    "/all-company/edit",
    companyController.validateAdmin,
    companyController.updateCompanyByAdmin
);


router_adminka.get("/events/menu", companyController.getMyCompanyEvents);

router_adminka.post(
    "/events/create",
    companyController.validateAuthCompany,
    uploader("events").single("event_images"),
    eventController.addNewEvent
);

router_adminka.post(
    "/events/edit/:id",
    companyController.validateAuthCompany,
    eventController.updateChosenEvent
);



// export router
module.exports = router_adminka;

