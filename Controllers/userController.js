const jwt = require('jsonwebtoken');
const User = require("../Models/userModel.js");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.findOne({ email }, async (err, user) => {
            if (user) {
                if (await user.correctPassword(password, user.password)) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 30 * 24 * 60 * 60 });

                    res.send({ message: "Logged in successfully!", success: true ,token});
                }
                else {
                    res.send({ message: "Incorrect Email or Password!" });
                }
            }
            else {
                res.send({ message: "Incorrect Email or Password!" });
            }
        });
    }
    catch (err) {
        res.send({ message: "Something went wrong. Try again later!" });
        console.log(err);
    }
};

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.findOne({ email }, async (err, user) => {
            if (user) {
                res.send({ message: "User already exists!" });
            }
            else {
                try {
                    const user = await User.create({ name, email, password });
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 30 * 24 * 60 * 60 });

                    res.send({ message: "Signed up successfully!", success: true ,token});
                }
                catch (err) {
                    res.send({ message: "Something went wrong. Try again later!" });
                    console.log(err);
                }
            }
        });
    }
    catch (err) {
        res.send({ message: "Something went wrong. Try again later!" });
        console.log(err);
    }
};

exports.userVerification = (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } 
        else {
            const user = await User.findById(data.id);
            if (user) return res.json({ status: true, user });
            else return res.json({ status: false });
        }
    });
};