const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getSingleThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).post(updateThought).delete(removeThought);
router.route('/: thoughtId/reactions').post(createReaction).delete(removeReaction);

module.exports = router;