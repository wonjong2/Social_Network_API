const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findById(req.params.userId)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true },
        )
            .then((updatedUserData) => res.json(updatedUserData))
            .catch((err) => res.status(500).json(err));
    },
    removeUser(req, res) {

    },
    addFriend(req, res) {

    },
    removeFriend(req, res) {

    },
};