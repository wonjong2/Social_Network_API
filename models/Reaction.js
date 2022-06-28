const { Schema, model, Types } = require('mongoose');

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
    }
);

// Getter for createdAt property
// helper????
function timeStamp() {
    //////////////////////////////////////////////
    // Need to impmement to return proper format
    //////////////////////////////////////////////
    return this.createAt;
}

module.exports = reactionSchema;
