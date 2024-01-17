const mongoose = require("mongoose");

const {
    product_collection_enums,
    product_status_enums,
    product_volume_enums,
} = require("../lib/config");

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
        product_name: {
            type: String,
            required: true,
        },
        product_collection: {
            type: String,
            required: true,
            enum: {
                values: product_collection_enums,
                message: "{VALUE} is not among permitted enum values",
            },
        },
        product_address: {
            type: String,
            required: true,
        },
        product_status: {
            type: String,
            required: false,
            default: "PROCESS",
            enum: {
                values: product_status_enums,
                message: "{VALUE} is not among permitted enum values",
            },
        },
        product_price: {
            type: Number,
            required: true,
        },
        product_size: {
            type: Number,
            required: true,
        },
        product_volume: {
            type: String,
            // default: 2,
            enum: {
                values: product_volume_enums,
                message: "{VALUE} is not among permitted enum values",
            },
        },
        product_description: {
            type: String,
            required: true,
        },
        product_images: {
            type: Array,
            required: false,
            default: [],
        },
        product_likes: {
            type: Number,
            required: false,
            default: 0,
        },
        product_views: {
            type: Number,
            required: false,
            default: 0,
        },
        company_mb_id: {
            type: Schema.Types.ObjectId, // bu Schemani ichida bz hohlayotgan type bor va bu typening ichidan objectId ol deyman.
            ref: "Member",
            required: false,
        },

    },
    {timestamps: true}
);

productSchema.index(
    {
        company_mb_id: 1,
        product_name: 1,
        product_size: 1,
        product_volume: 1,
    },
    {unique: true}     //compound  unique ucun ishlatiladi
); // index  bu: 1ta restaurant un birxil nomdagi tovarni, bir size va volume bulsa,databasega yozmasin deg.


module.exports = mongoose.model("Product", productSchema);