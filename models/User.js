const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password length must be at least 6 or more characters"],
  },
});

// fire a function after a doc is saved and here the post refers to the post action not the request, just as 
// userSchema.post('save', function (doc, next) {
//     console.log('New user created', doc);
//     next();
// })

// Fire a a function before the doc is saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;
