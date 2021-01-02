const express = require('express');
const Post = require('../../MongoseDB/modes/Post');
const router = express.Router();

const header = {
    'Access-Control-Allow-Origin': '*'
}

router.get(
    '/get/list',
    [],
    async (req, res) => {
        try {
            const post = await Post.find().sort({ date: -1 });
            res.set(header).json(post);
        } catch (erro) {
            console.error(erro.message);
            res.status(500).json({
                status: 500,
                msg: 'Server Error'
            })
        }
    }
);

module.exports = router;