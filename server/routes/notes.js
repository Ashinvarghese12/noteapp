const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send('Unauthorized');
  const data = jwt.verify(token, JWT_SECRET);
  req.user = data;
  next();
};

router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.post('/', auth, async (req, res) => {
  const note = await Note.create({ ...req.body, userId: req.user.id });
  res.json(note);
});

router.put('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(note);
});

router.delete('/:id', auth, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.send('Deleted');
});

module.exports = router;
