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
            { runValidators: true, new: true },
        )
            .then((updatedUserData) => res.json(updatedUserData))
            .catch((err) => res.status(500).json(err));
    },
    removeUser(req, res) {
        User.deleteOne({ _id: req.params.userId })
            .then((result) => res.json(result))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
            .then((userData) =>
                !userData
                    ? res.status(404).json({ messsage: 'No user found with that ID' })
                    : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
            .then((userData) =>
                !userData
                    ? res.status(404).json({ messsage: 'No user found with that ID' })
                    : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
};