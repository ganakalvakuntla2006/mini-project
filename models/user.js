const mongoose = require('mongoose');

// Connect to MongoDB (Note: Ensure the connection string matches your setup)
mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: Number,
  // Data Association: Reference to the Post model
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post" // This must match the name used in mongoose.model() in post.js
    }
  ]
});

module.exports = mongoose.model("user", userSchema);