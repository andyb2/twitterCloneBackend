const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt');

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
        validate: { min: 6 },
        allowNull: false,
        get() {
            return () => this.getDataValue("password");
        }
    },
});

// checks the users password input to the hashed password stored in the DB and returns true if input matches
User.prototype.checkCorrectPassword = async (password, hash) => {
    const isCorrect = await bcrypt.compare(password, hash)
    return isCorrect
}
// takes the user input and hashes the password in the DB
const passwordHash = async (user) => {
    if (user.changed("password")) {
        const passwordHash = await bcrypt.hash(user.password(), 10)
        user.password = passwordHash
    }
};
// before a new user is created run the passwordHash function to hash password
User.beforeCreate(passwordHash);
// if the user changes their password.. passwordHash function will run to hash new password
User.beforeUpdate(passwordHash);

module.exports = User;