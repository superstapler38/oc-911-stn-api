// express router
const router = require("express").Router();

// controllers
const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/notes");

// model
const Note = require("../models/Note");

// middleware
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route('/')
    .get(advancedResults(Note), getNotes)
    .post(createNote);

router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(authorize('admin'), deleteNote);

module.exports = router;