const { Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => res.json(thought))
            .catch((err) => {
                return res.status(500).json(err);
            });
    },
    updateThought(req, res) {

    },
    removeThought(req, res) {

    },
    createReaction(req, res) {

    },
    removeReaction(req, res) {

    },
};