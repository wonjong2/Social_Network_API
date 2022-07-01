const { Schema, model } = require('mongoose');
// reactionSchema for reactions array
const reactionSchema = require('./Reaction');
// timeStamp function, the getter method to format the timestamp, from date.js file
const { timeStamp } = require('../utils/date');

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
            // Use a getter method to format the timestamp on query
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
            getters: true,
        }
    }
);

// Create a virtual property 'friendCount' that gets the number of friends per a user
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;