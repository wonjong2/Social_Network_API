const { Schema, Types } = require('mongoose');
const { timeStamp } = require('../utils/date');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLenght: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp,
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

module.exports = reactionSchema;
