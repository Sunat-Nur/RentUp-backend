
const express = require("express");
const router = express.Router();                   // expressni ichidan router olib chiqilyabdi
const memberController = require("./controllers/memberController");


/**********************************
 *         REST  API             *
 **********************************/



router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);


// boshqa routerlar
router.get("/menu",  (req, res) =>{
    res.send ("home-list page");
});


router.get("/community",  (req, res) => {
    res.send ("community page");
});


// export router
module.exports = router;


