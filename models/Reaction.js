const { Schema, Types } = require('mongoose');
// timeStamp function, the getter method to format the timestamp, from date.js file
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
            // Use a getter method to format the timestamp on query
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
