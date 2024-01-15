/* object yasalib uni modulening ichidagi exportga tenglashtirilyabdi
 object da methodlari orqali chaqirilyabdi
 controllerlar object orqali quriladi, model class lar orqali quramiz
 */

const Definer = require("../lib/error");
const Member = require("../models/Member");
const assert = require("assert");
let memberController = module.exports;

memberController.signup = async (req, res ) => {
    try {
        console.log("POST: cont/signupUser");
        const data = req.body,
            member = new Member(),
            new_member = await member.signupData(data);
        const token = memberController.createToken(new_member);
        res.cookie("access_token", token, {
            maxAge: 6 * 3600 * 1000,
            httpOnly: false,
        });

        res.json({state: 'success', data: new_member});
    }
    catch(err){           // xatoni ushlassh uchun try catch dan foydalanamiz
        console.log(`ERROR, cont/signupUser, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

memberController.login = async (req, res ) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
            member = new Member(),  // member service modeldan instance olinyabdi
            result = await member.loginData(data);   //ichida request body yuborilyabdi

        res.json({state: 'success', data: result});
    }
    catch(err){
        console.log(`ERROR, cont/login, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }


};

memberController.logout = (req, res ) => {
    console.log("GET cont.logout");
    res.send("logout page");
};


memberController.createToken = (result) => {  //result object hisoblanadi
    try {
        const upload_data = {
            _id: result._id,
            mb_nick: result.mb_nick,
            mb_type: result.mb_type,
        };

        const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
            expiresIn: "6h",
        });

        assert.ok(token, Definer.auth_err3);
        return token;
    } catch (err) {
        throw err;
    }
};
