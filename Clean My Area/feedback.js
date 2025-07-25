const express = require('express');
const router = express.Router();

// Temporary in-memory storage (for now)
let feedbackList = [];

// POST - Add feedback
router.post('/', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: 'Name and comment are required' });
  }

  const feedback = {
    id: feedbackList.length + 1,
    name,
    comment,
    submittedAt: new Date(),
  };

  feedbackList.push(feedback);
  res.status(201).json(feedback);
});

// GET - Retrieve all feedback
router.get('/', (req, res) => {
  res.json(feedbackList);
});

module.exports = router;
