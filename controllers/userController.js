const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findById(req.params.userId)
            .then((user) =>
                !user
                    ? res.status(404).json({ messsage: 'No user with that ID' })
                    : res.json(user))
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
            .then((updatedUserData) =>
                !updatedUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(updatedUserData))
            .catch((err) => res.status(500).json(err));
    },
    // Bonus : Application deletes a user's associated thoughts when the user is deleted
    removeUser(req, res) {
        // Find the user document with the userId
        User.findById(req.params.userId)
            // Delete all thoughts documents from the Thought collection with thought's _id in the user's thoguths array
            .then((userData) =>
                Thought.deleteMany({ _id: { $in: userData.thoughts } })
            )
            // Delete the user document with the userId
            .then(() =>
                User.deleteOne({ _id: req.params.userId })
            )
            .then((deleteUser) => res.json(deleteUser))
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