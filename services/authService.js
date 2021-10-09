const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const register = async({ username, password }) => {
    //TODO check if username exist

    const user = new User({ username, password });
    return await user.save();
};

const login = async({ username, password }) => {

    const user = await User.findOne({ username });

    if (!user) throw { message: "User not found" };

    let isIdentical = await bcrypt.compare(password, user.password);
    if (!isIdentical) throw { message: "Password does not match!" };
    // generate token
    let token = jwt.sign({ _id: user._id, roles: ['admin'] }, SECRET);
    return token;
};

module.exports = {
    register,
    login,
}