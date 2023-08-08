const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const commentSchema = new Schema({
  blogpost:  [{ type: Schema.Types.ObjectId, ref: "blogpost" }],
  user:  [{ type: Schema.Types.ObjectId, ref: "user" }],
  date: { type: String, required: false, unique: false },
  comment: { type: String, required: false },
},
{
    timestamps: true
});

const comment = mongoose.model('comment', commentSchema)

module.exports = comment
