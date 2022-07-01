const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create 3 user documents for seeds data
    const users = [
        {
            username: 'user1',
            email: 'user1@bootcamp.com'
        },
        {
            username: 'user2',
            email: 'user2@bootcamp.com'
        },
        {
            username: 'user3',
            email: 'user3@bootcamp.com'
        },
    ];

    await User.collection.insertMany(users);
    console.log(users);
    process.exit(0);
});
