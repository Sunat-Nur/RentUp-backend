/* object yasalib uni modulening ichidagi exportga tenglashtirilyabdi
 object da methodlari orqali chaqirilyabdi
 controllerlar object orqali quriladi, model class lar orqali quramiz
 */


const Member = require("../models/member");
const Product = require("../models/product");

let companyController = module.exports;


companyController.home = (req,res) => {
    try {
        console.log("GET: cont/home");
        res.render('home-page');  // home-page.ejs fielga malumotni yuborayopti.
    } catch(err) {
        console.log(`ERROR: cont/home, ${err.message}`);  //error bulsa qaytar degan qism.
        res.json({state: "fail", message: err.message});
    }
};

companyController.getMyCompanyProducts = async (req, res) => {
    try {
        console.log("GET: cont/getMyCompanyProducts");
        // TODO get my restaurant products

        const product = new Product();
        const data = await product.getAllProductsDataResto(res.locals.member);

        res.render("home-page", {company_data: data});
    } catch(err) {
        console.log(`ERROR: cont/getMyCompanyProducts, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}

companyController.getSignupMyCompany = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyCompany");
        res.render("signup");
    } catch(err) {
        console.log(`ERROR: cont/getSignupMyCompany, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}



companyController.signupProcess = async (req, res) => {
    try {
        console.log("POST: cont/signup");
        const data = req.body;
        const member = new Member(); // member servica modeldan instance olyabdi
        req.session.member = await member.signupData(data); // mongo db ga qo'shib berdi
        res.redirect('/resto/products/menu');
    } catch (err) {
        console.log(`ERROR, cont/signup, ${err.message}`);
        res.json({ state: 'fail', message: err.message });
    }
};


companyController.getLoginMyCompany = async (req, res ) => {
    try {
        console.log("GET: cont/getLoginMyCompany");
        res.render('login-page')
    } catch(err){
        console.log(`ERROR, cont/getLoginMyCompany, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

companyController.loginProcess = async (req, res ) => {
    try {
        console.log("POST: cont/login process");
        const data = req.body,
            member = new Member();   //ichida request body yuborilyabdi
        req.session.member = await member.loginData(data);
        req.session.save(function () {     //login bolgandan ken qaysi page ga borishi mumkinligini korsatyabmiz
            res.redirect("/resto/products/menu");
        });
    }
    catch(err){
        console.log(`ERROR, cont/login, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};


companyController.logout = (req, res ) => {
    console.log("GET cont.logout");
    res.send("logout page");
};

companyController.validateAuthCompany = (req, res, next) => {
    if(req.session?.member?.mb_type === "RESTAURANT") {
        req.member = req.session.member;
        next();
    } else res.json({state: "fail", message: "only authenticated members with restaurant type" })
};


companyController.checkSessions = (req, res ) => {
    if(req.session?.member) {
        res.json({state: 'succeed', data: req.session.member });
    } else {
        res. json ({state: "fail", message: "You aren't authenticated"});
    }
};
// agar session mavjud bolsa sessiondagi ma'lumotlarni brouserga yuborsin