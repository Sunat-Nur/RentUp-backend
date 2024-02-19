const assert = require("assert");
const Definer = require("../lib/error");
const eventModel = require("../schema/event.model");
const {
    shapeIntoMongooseObjectId,
    lookup_auth_member_liked,
} = require("../lib/config");

class Event {
    constructor() {}
    async getMyCompanyEventsData(member) {
        try {
            const id = shapeIntoMongooseObjectId(member?._id);
            const result = await eventModel.find({
                company_mb_id: id,
            });
            assert.ok(result, Definer.general_err1);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async addNewEventData(data, member) {
        try {
            data.company_mb_id = shapeIntoMongooseObjectId(member?._id);

            const new_event = new eventModel(data);
            const result = await new_event.save();

            assert.ok(result, Definer.event_err1);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateChosenEventData(param_id, updated_data, auth_id) {
        try {
            const id = shapeIntoMongooseObjectId(param_id),
                mb_id = shapeIntoMongooseObjectId(auth_id);

            console.log(updated_data);
            const result = await eventModel
                .findOneAndUpdate({ _id: id, company_mb_id: mb_id }, updated_data, {
                    runValidators: true,
                    lean: true,
                    returnDocument: "after",
                })
                .exec();

            assert.ok(result, Definer.general_err1);

            return result;
        } catch (err) {
            throw err;
        }
    }

    async getCompanyEventsData(member, inquiry) {
        try {
            const auth_mb_id = shapeIntoMongooseObjectId(member?._id);

            const limit = (inquiry.limit *= 1);
            const page = (inquiry.page *= 1);

            const sort = inquiry.order
                ? { [`${inquiry.order}`]: -1 }
                : { createdAt: -1 };

            const result = await eventModel
                .aggregate([
                    { $match: { event_status: "Active" } },
                    {
                        $sort: sort,
                    },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: "members",
                            localField: "company_mb_id",
                            foreignField: "_id",
                            as: "member_data",
                        },
                    },
                    { $unwind: "$member_data" },
                    lookup_auth_member_liked(auth_mb_id),
                ])
                .exec();
            assert.ok(result, Definer.article_err3);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
module.exports = Event;
