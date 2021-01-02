const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    commentSize: Number,
    title: String,
    text: String,
    comment: [{
        name: String,
        text: String,
        data: {
            type: Date,
            default: Date.now()
        }
    }],
    data: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model("posts", PostSchema);