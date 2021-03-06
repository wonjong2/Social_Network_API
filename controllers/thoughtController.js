const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        // Create a new Thought
        Thought.create(req.body)
            .then((thoughtData) =>
                // Add the crdated thoght's _id to the associated user's thoughts array field
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughtData._id } },
                    { new: true },
                )
            )
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No such user exists' })
                    : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { runValidators: true, new: true },
        )
            .then((updatedThoughtData) => res.json(updatedThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    removeThought(req, res) {
        // Delete the thought with the thoughtId
        Thought.deleteOne({ _id: req.params.thoughtId })
            // Delete the delted thoughtId from the associated user's thoghts array
            .then((resutl) => User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true },
            ))
            .then((userData) =>
                !userData
                    ? res.status(404).json({ messsage: 'No user found with that thought' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ messsage: 'No thought found with that ID' })
                    : res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true },
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ messsage: 'No thought found with that ID' })
                    : res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
};