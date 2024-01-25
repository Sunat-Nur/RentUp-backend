const mongoose = require("mongoose");

exports.member_type_enums = ["ADMIN", "COMPANY", "USER"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.member_address_enums = ["tashkent", "samarkand", "bukhara", "xoramz", "andijan", "surkhandaryo", "qarshi", "navoiy","namamgan"];


exports.product_address_enums = ["tashkent", "samarkand", "bukhara", "xoramz", "andijan", "surkhandaryo", "qarshi", "navoiy","namamgan"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_collection_enums = ["House", "Apartment", "Office", "Villa","studio","etc"];
exports.product_value_enums = [1, 2, 3, 4, 5 ];

exports.ordenary_enums = ["Y", "N"];

exports.like_view_group_list = ["product", "member", "community"];
exports.board_id_enum_list = ["celebrity", "evaluation", "story", "fact"];
exports.board_article_status_enum_list = ["active", "deleted"];

/*****************************************
 *   MONGODB RELATED COMMANDS            *
 *****************************************/

exports.shapeIntoMongooseObjectId = (target) => {
    if (typeof target === "string") {
        return new mongoose.Types.ObjectId(target);
    } else return target;
};

exports.lookup_auth_member_following = (mb_id, origin) => {
    const follow_id = origin === "follows" ? "$subscriber_id" : "$_id";
    return {
        $lookup: {
            from: "follows",
            let: {
                lc_follow_id: follow_id,
                lc_subscriber_id: mb_id,
                nw_my_following: true,
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$follow_id", "$$lc_follow_id"] },
                                { $eq: ["$subscriber_id", "$$lc_subscriber_id"] },
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        follow_id: 1,
                        subscriber_id: 1,
                        my_following: "$$nw_my_following",
                    },
                },
            ],
            as: "me_followed",
        },
    };
};

exports.lookup_auth_member_liked = (mb_id) => {
    return {
        $lookup: {
            from: "likes",
            let: {
                lc_liken_item_id: "$_id",
                lc_mb_id: mb_id,
                nw_my_favorite: true,
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$like_ref_id", "$$lc_liken_item_id"] },
                                { $eq: ["$mb_id", "$$lc_mb_id"] },
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        mb_id: 1,
                        like_ref_id: 1,
                        my_favorite: "$$nw_my_favorite",
                    },
                },
            ],
            as: "me_liked",
        },
    };
};