const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    commentSize: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    comment: [{
        name: String,
        content: String,
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