function check(req, res, next) {
    const { password } = req.body;
    if (password == "!@#$%^&*()_+") next();
    else return res.status(400).json({ msg: 'the post is not allow' });
}


module.exports = check;