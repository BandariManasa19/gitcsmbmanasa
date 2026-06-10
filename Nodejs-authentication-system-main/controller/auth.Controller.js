const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

module.exports.signup = async (req, res, next) => {
    try {
        let user = req.body;

        let dbuser = await pool.query(
            "SELECT * FROM nodejsworking WHERE email=?",
            [user.email]
        );

        dbuser = dbuser[0];

        if (dbuser.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        let hashedPassword = await bcrypt.hash(user.password, 10);

        await pool.query(
            "INSERT INTO nodejsworking(username,email,password) VALUES(?,?,?)",
            [user.username, user.email, hashedPassword]
        );

        res.status(201).json({
            message: "User created successfully by manasa"
        });

    } catch (error) {
        next(error);
    }
};
module.exports.login = async (req, res, next) => {
    console.log("JWT SECRET:", process.env.JWT_SECRET);
    try {
        let user = req.body;

        let dbuser = await pool.query(
            "SELECT * FROM nodejsworking WHERE email=?",
            [user.email]
        );

        dbuser = dbuser[0];

        if (dbuser.length == 0) {
            return res.status(401).json({
                message: "User does not exist"
            });
        }

        let exUser = dbuser[0];

        let same = await bcrypt.compare(user.password, exUser.password);

        if (!same) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        let token = jwt.sign(
            {
                id: exUser.id,
                email: exUser.email,
                username: exUser.username
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: "Login successful by manasa",
            token: token,
            user: exUser
        });

    } catch (error) {
        next(error);
    }
};