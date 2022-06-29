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
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
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