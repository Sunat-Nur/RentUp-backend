const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "PEDAL", "RESTAURANT"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordenary_enums = ["Y", "N"];

exports.product_collection_enums = ["hovli", "dom", "etc"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_size_enums = ["small", "large", "normal", "set"];
exports.product_volume_enums = ['70kv', '80kv', '90kv', '100kv'];

/*****************************************
 *   MONGODB RELATED COMMANDS            *
 *****************************************/

exports.shapeIntoMongooseObjectId = (target) => {
    if (typeof target === 'string') {
        return new mongoose.Types.ObjectId(target);
    } else return target;
}