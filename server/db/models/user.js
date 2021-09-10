const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt');
const saltRounds = 10

const User = db.define("user", {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        alloWNull: false,
        validate: { isEmail: true }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { min: 8 }
    }
});

const hashPassword = (user) => {
    // console.log(`[USER]`, blarg)
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            console.log(`HASH`, hash)
            user.password = hash
            console.log(`[PW]`, user.password)
        })
    })
}
// test();
User.beforeCreate(hashPassword)
module.exports = User;