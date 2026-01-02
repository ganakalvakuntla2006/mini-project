const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
