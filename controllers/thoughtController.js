const { Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => res.json(thoughtData))
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
            { new: true },
        )
            .then((updatedThoughtData) => res.json(updatedThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    removeThought(req, res) {

    },
    createReaction(req, res) {

    },
    removeReaction(req, res) {

    },
};