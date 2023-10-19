/* object yasalib uni modulening ichidagi exportga tenglashtirilyabdi
 object da methodlari orqali chaqirilyabdi
 controllerlar object orqali quriladi, model class lar orqali quramiz
 */


const Member = require("../models/member");
let companyController = module.exports;

companyController.getSignupMyCompany = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyCompany");
        res.render("signup");
    } catch(err) {
        console.log(`ERROR: cont/getSignupMyCompany, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}

companyController.signupProcess = async (req, res ) => {
    try {
        console.log("POST: cont/signupproces");
        const data = req.body,
            member = new Member(),  // member service modeldan instance olinyabdi
            new_member = await member.signupData(data);   //ichida request body yuborilyabdi

        res.json({state: 'success', data: new_member});
    }
    catch(err){           // xatoni ushlassh uchun try catch dan foydalanamiz
        console.log(`ERROR, cont/signup, ${err.message}`)
        res.json({state: "fail", message: err.message});
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
        console.log("POST: cont/login");
        const data = req.body,
            member = new Member(),  // member service modeldan instance olinyabdi
            new_member = await member.loginData(data);   //ichida request body yuborilyabdi

        res.json({state: 'success', data: new_member});
    }
    catch(err){           // xatoni ushlassh uchun try catch dan foydalanamiz
        console.log(`ERROR, cont/loginProcess, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

companyController.logout = (req, res ) => {
    console.log("GET cont.logout");
    res.send("logout page");
};