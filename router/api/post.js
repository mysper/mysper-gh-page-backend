const express = require('express');
const Post = require('../../MongoseDB/modes/Post');
const router = express.Router();

const header = {
    'Access-Control-Allow-Origin': '*'
}

router.get(
    '/list',
    [],
    async (req, res) => {
        try {
            const post = await Post.find().select("id commentSize title data").sort({ date: -1 });
            res.set(header).json(post);
        } catch (erro) {
            console.error(erro.message);
            res.status(500).set(header).json({
                msg: 'Server Error'
            });
        }
    }
);
router.get(
    '/:id',
    [],
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).set(header).json({
                msg: `Cannot find ${req.params.id}`
            });
            res.set(header).json(post);
        } catch (erro) {
            console.error(erro.message);
            res.status(500).set(header).json({
                msg: 'Server Error'
            });
        }
    }
)
router.delete(
    '/posts',
    [],
    async (req, res) => {
        try {
            const posts = req.body;
            const status = {};

            for (let element of posts) {
                const post = Post.findById(element);
                if (post) {
                    await post.remove();
                    status[element] = "Successed";
                } else {
                    status[element] = "Error";
                }
            }

            res.set(header).json({
                status: status
            });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).set(header).json({
                    msg: "Post not found"
                });
            }
            res.status(500).set(header).json({
                msg: 'Server Error'
            });
        }
    }
);
router.delete(
    '/post/:id',
    [],
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                return res.status(404).set(header).json({
                    msg: "Post not found"
                });
            }
            await post.remove();
            res.set(header).json({
                msg: "Post removed"
            });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).set(header).json({
                    msg: "Post not found"
                });
            }
            res.status(500).set(header).json({
                msg: 'Server Error'
            });
        }
    }
);
router.post(
    '/new',
    [],
    async (req, res) => {
        const { title, content } = req.body;
        const newPost = new Post({
            title,
            content
        });
        const post = await newPost.save();
        res.set(header).json(post);
    }
);

module.exports = router;