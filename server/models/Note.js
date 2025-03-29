const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  body: String,
  color: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Note', NoteSchema);
