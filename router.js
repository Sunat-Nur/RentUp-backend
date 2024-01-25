const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const companyController = require("./controllers/companyController");
const orderController = require("./controllers/orderController");
const communityController = require("./controllers/communityContoller");
const uploader_community = require ("./utils/upload-multer")("community");
const uploader_member = require ("./utils/upload-multer")("members");
const followController = require("./controllers/followController");

/**********************************
 * Member related routers        *
 **********************************/

router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
    "/member/:id",
    memberController.retrieveAuthMember,
    memberController.getChosenMember
);

router.post(
    "/member-liken",
    memberController.retrieveAuthMember,
    memberController.likenMemberChosen ,
);

/**********************************
 * Product related routers        *
 **********************************/

router.post(
    "/products",
    memberController.retrieveAuthMember,
    productController.getAllProducts);

router.get(
    "/products/:id",
    memberController.retrieveAuthMember,
    productController.getChosenProduct
);

router.get("/companies",
    memberController.retrieveAuthMember,
    companyController.getCompanies
);

router.get(
    "/companies/:id",
    memberController.retrieveAuthMember,
    companyController.getChosenCompany
);

router.post(
    "/member/update",
    memberController.retrieveAuthMember,
    uploader_member.single("mb_image"),
    memberController.updateMember
);


/**********************************
 * order related routers        *
 **********************************/

router.post(
    "/orders/create",
    memberController.retrieveAuthMember,
    orderController.createOrder
)

router.get(
    "/orders", // end_point
    memberController.retrieveAuthMember, // oldin view qilganmi va kim request qiladiganini bilish un retrieveAuthMember ishlatyabman
    orderController.getMyOrders,  // orderController da getMyOrders methodini yaratib olyabman
);

router.post(
    "/orders/edit",
    memberController.retrieveAuthMember,  // oldin view qilganmi va kim request qiladiganini bilish un retrieveAuthMember ishlatyabman
    orderController.editChosenOrder  // orderController da editChosenOrder methodini yaratib olyabman
);



/**********************************
 * Community related routers        *
 **********************************/

router.post(
    "/community/image",
    uploader_community.single("community_image"),
    communityController.imageInsertion
);

router.post(
    "/community/create",
    memberController.retrieveAuthMember,
    communityController.createArticle
);

router.get(
    "/community/articles",
    memberController.retrieveAuthMember,
    communityController.getMemberArticles
);

router.get(
    "/community/target",
    memberController.retrieveAuthMember,
    communityController.getArticles
);

router.get(
    "/community/single-article/:art_id",
    memberController.retrieveAuthMember,
    communityController.getChosenArticle
);


/**********************************
 * Following related routers        *
 **********************************/


router.post(
    "/follow/subscribe",
    memberController.retrieveAuthMember,
    followController.subscribe
);


router.post(
    "/follow/unsubscribe",
    memberController.retrieveAuthMember,
    followController.unsubscribe
);


router.get(
    "/follow/followings",
    followController.getMemberFollowings
);

router.get(
    "/follow/followers",
    memberController.retrieveAuthMember,
    followController.getMemberFollowers
);

module.exports = router;

// request lar 3 xil

// rest API, TRadition va graphl request


