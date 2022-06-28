const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            MaxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

// Getter for createdAt property
function timeStamp() {
    //////////////////////////////////////////////
    // Need to impmement to return proper format
    //////////////////////////////////////////////
    return this.createAt;
}

// Create a virtual property 'friendCount' that gets the number of friends per a user
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;