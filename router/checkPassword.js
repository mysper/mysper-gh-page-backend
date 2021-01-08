const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pwd = mongoose.model(
    'infomation',
    new Schema({ password: String }),
    'infomation'
);

async function check(req, res, next) {
    const { password } = req.body;
    const pd = await pwd.findById("5ff8947e455d649be40a9ffc");
    console.log(pd);
    if (password == pd.password) next();
    else return res.status(400).json({ msg: 'the post is not allow' });
}

module.exports = check;