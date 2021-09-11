const router = require("express").Router();
const { User } = require("../../db/models/");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, password and email are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }
        const registerData = {
            username: username,
            email: email,
            password: password
        };
        const registerUser = await User.create(registerData)
        if (!registerUser.id) {
            console.log({ error: `Sorry failed to create entry for ${registerUser.username}` });
            res.status(401).json({ error: `Sorry failed to create entry for ${registerUser.username}` });
        }
        const token = jwt.sign(
            { id: registerUser.dataValues.id },
            process.env.SESSION_SECRET,
            { expiresIn: 86400 }
        );
        res.status(201).json({
            id: registerUser.dataValues.id,
            username: registerUser.dataValues.username,
            email: registerUser.dataValues.email,
            token: token
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        let pwIsValid;
        // if the user inputs a username that is not found in the DB pwIsValid wont check for a password
        if (userData !== null) {
            pwIsValid = await userData.checkCorrectPassword(password, userData.password());
        }
        // if username not found in DB respond with error
        if (userData === null) {
            console.log({ error: `${username} was not found` });
            res.status(401).json({ error: `${username} was not found` });
        } else if (pwIsValid === false) {
            console.log({ error: `Wrong username or password` });
            res.status(401).json({ error: `Wrong username or password` });
        } else {
            // token created on successful login
            const token = jwt.sign(
                { id: userData.dataValues.id },
                process.env.SESSION_SECRET,
                { expiresIn: 86400 }
            );
            res.status(201).json({
                id: userData.dataValues.id,
                username: userData.dataValues.username,
                email: userData.dataValues.email,
                token: token
            });
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/logout', (req, res, next) => {
    try {
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router;