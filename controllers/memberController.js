const Member = require("../models/Member");
const Definer = require("../lib/error");
const jwt = require("jsonwebtoken");
const assert = require("assert");
const memberController = module.exports;
const memberModel = module.exports;


memberController.signup = async (req, res) => {
    try {
        console.log("POST: cont/signup");
        const data = req.body,
            member = new Member(),
            new_member = await member.signupData(data);
        const token = memberController.createToken(new_member);
        res.cookie("access_token", token, {
            maxAge: 6 * 3600 * 1000,
            httpOnly: false,
        });

        res.json({state: 'success', data: new_member});
    } catch (err) {           // xatoni ushlassh uchun try catch dan foydalanamiz
        console.log(`ERROR, cont/signup, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

memberController.login = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
            member = new Member(),
            result = await member.loginData(data);

        const token = memberController.createToken(result);
        res.cookie("access_token", token, {
            maxAge: 6 * 3600 * 1000,
            httpOnly: false,
        });

        res.json({state: 'success', data: result});
    } catch (err) {
        console.log(`ERROR, cont/login, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

memberController.logout = (req, res) => {
    console.log("GET cont/logout");
    res.cookie("access_token", null, {maxAge: 0, httpOnly: true});
    res.send({state: "success", data: "logout successfully! "});
};


memberController.createToken = (result) => {
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


memberController.checkMyAuthentication = (req, res) => {
    try {
        console.log("GET cont/checkMyAuthentication");
        let token = req.cookies["access_token"];
        console.log("token:::", token);
        const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
        assert.ok(token, Definer.auth_err3);
        res.json({state: 'success', data: member});
    } catch (err) {
        throw err;
    }
};

memberController.getChosenMember = async (req, res) => {
    try {
        console.log("GET cont/getChosenMember");
        const id = req.params.id;
        const member = new Member();
        const result = await member.getChosenMemberData(req.member, id);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getChosenMember, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

memberController.likenMemberChosen = async (req, res) => {
    try {
        console.log("POST cont/likeMemberChosen");
        assert.ok(req.member, Definer.auth_err4);
        const member = new Member();
        const {like_ref_id, group_type} = req.body;
        const result = await member.likeChosenItemByMember(req.member, like_ref_id, group_type);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/likeMemberChosen, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

memberController.updateMember = async (req, res) => {
    try {
        console.log("POST, cont/updateMember");
        assert.ok(req.member, Definer.auth_err1);
        const member = new Member();
        const result = await member.updateMemberData(req.member?._id, req.body, req.file);
        console.log("result", result);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/updateMember, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

memberController.retrieveAuthMember = (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
        next();
    } catch (err) {
        console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
        next();
    }
};












