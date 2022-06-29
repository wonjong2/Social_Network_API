const dayjs = require('dayjs');

// Getter for createdAt property in thoughtSchema and reactionSchema
function timeStamp(date) {
    return dayjs(date).format('MMMM D, YYYY h:mm A');
}

module.exports = { timeStamp };