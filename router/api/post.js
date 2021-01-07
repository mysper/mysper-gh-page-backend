const express = require('express');
const Post = require('../../MongoseDB/modes/Post');
const router = express.Router();

router.get(
    '/list',
    [],
    async (req, res) => {
        try {
            const post = await Post.find().select("id commentSize title date type ref").sort({ date: -1 });
            res.json(post);
        } catch (erro) {
            console.error(erro.message);
            res.status(500).json({
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
            if (!post) return res.status(404).json({
                msg: `Cannot find ${req.params.id}`
            });
            res.json(post);
        } catch (erro) {
            console.error(erro.message);
            res.status(500).json({
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

            res.json({
                status: status
            });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).json({
                    msg: "Post not found"
                });
            }
            res.status(500).json({
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
                return res.status(404).json({
                    msg: "Post not found"
                });
            }
            await post.remove();
            res.json({
                msg: "Post removed"
            });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).set(header).json({
                    msg: "Post not found"
                });
            }
            res.status(500).json({
                msg: 'Server Error'
            });
        }
    }
);
router.post(
    '/new',
    [],
    async (req, res) => {
        const { type, title, content } = req.body;
        if (type === 'link') ref = content;
        else ref = null;
        const newPost = new Post({
            type, title, ref, content
        });
        const post = await newPost.save();
        res.json(post);
    }
);

module.exports = router;