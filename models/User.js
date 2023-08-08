const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
require('dotenv').config()
SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

const userSchema = new Schema({
  name: { type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },

  blogposts: [{ type: Schema.Types.ObjectId, ref: "blogpost" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "blogpost" }],
  shares: [{ type: Schema.Types.ObjectId, ref: "blogpost" }],
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);


// const { Schema } = require("mongoose")
// const mongoose = require("mongoose")

// const userSchema = new Schema({
//   name: { type: String, required: true, unique: true },
//   email: { type: String, required: false, unique: false },
//   password: { type: String, required: true },
//   likes: [{ type: Schema.Types.ObjectId, ref: "posts" }],
//   comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
//   posts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
// });

// const user = mongoose.model('user', userSchema)

// module.exports = user
