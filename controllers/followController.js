const Definer = require("../lib/error");
const jwt = require("jsonwebtoken");
const Follow = require("../models/Follow");
const assert = require("assert");
const followController = module.exports;


followController.subscribe = async (req, res) => {
    try {
        console.log("GET cont/subscribe");
        assert.ok(req.member, Definer.auth_err4);
        const follow = new Follow();
        const result = await follow.subscribeData(req.member, req.body);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/subscribe, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};


followController.unsubscribe = async (req, res) => {
    try {
        console.log("GET cont/unsubscribe");
        assert.ok(req.member, Definer.auth_err4);
        const follow = new Follow();
        const result = await follow.unsubscribeData(req.member, req.body);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/subscribe, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

followController.getMemberFollowings = async (req, res) => {
    try {
        console.log("GET cont/getMemberFollowings");
        const follow = new Follow();
        const result = await follow.getMemberFollowingData(req.query);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getMemberFollowings, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

followController.getMemberFollowers = async (req, res) => {
    try {
        console.log("GET cont/getMemberFollowers");
        const follow = new Follow();
        const result = await follow.getMemberFollowersData(req.member, req.query);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getMemberFollowers, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};