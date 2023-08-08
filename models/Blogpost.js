const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const blogpostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user',  required: true },
    // creator: {type: Schema.Types.ObjectId, ref: 'user'},
    title: { type: String, required: true, unique: false },
    date: { type: String, required: false, unique: false },
    post: { type: String, required: true },
    likes: { type: String, required: false, unique: true },
    comments:  [{ type: Schema.Types.ObjectId, ref: "comment" }],
},
    {
        timestamps: true,
    });


const blogpost = mongoose.model('blogpost', blogpostSchema)

module.exports = blogpost
