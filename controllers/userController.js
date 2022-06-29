const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {

    },
    createUser(req, res) {

    },
    updateUser(req, res) {

    },
    removeUser(req, res) {

    },
    addFriend(req, res) {

    },
    removeFriend(req, res) {

    },
};