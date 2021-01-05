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
        content: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        default: "text"
    }
});

module.exports = Post = mongoose.model("posts", PostSchema);