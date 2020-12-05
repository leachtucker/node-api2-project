const express = require('express');
const db = require('../data/db');

const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
    db.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// GET post with ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(result);
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// GET comments on post with ID
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    db.findPostComments(id)
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(result);
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// POST post (Create a post)
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }

    db.insert({ title: req.body.title, contents: req.body.contents })
        .then(result => {
            res.status(201).json({ id: result.id, title: req.body.title, contents: req.body.contents });
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
});

// POST comment for post with ID
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    if (!req.body.text) {
        return res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }

    // Checking if post with specified id exists
    db.findById(id)
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        });

    db.insertComment({ text: req.body.text, post_id: id })
        .then(result => {
            res.status(201).json({ id: result.id, text: req.body.text });
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There was an error while saving the comment to the database" });
        });
});

// PUT post (update post)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }

    // Checking if post with specified id exists
    db.findById(id)
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        });

    db.update(id, { title: req.body.title, contents: req.body.contents })
        .then(changes => {
            if (changes >= 1) {
                res.status(200).json({ id: id, title: req.body.title, contents: req.body.contents });
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The post information could not be modified." });
        });
});

// PUT post (update post)
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Checking if post with specified id exists
    db.findById(id)
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        });

    db.remove(id)
        .then(delRecords => {
            if (delRecords >= 1) {
                return res.status(200).json({ "message": "Deleted post" });
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The post information could not be modified." });
        });
});

module.exports = router;