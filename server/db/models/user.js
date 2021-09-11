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

User.prototype.checkCorrectPassword = async (password, hash) => {
    const isCorrect = await bcrypt.compare(password, hash)
    return isCorrect
}

const passwordHash = async (user) => {
    if (user.changed("password")) {
        const passwordHash = await bcrypt.hash(user.password(), 10)
        user.password = passwordHash
    }
};

User.beforeCreate(passwordHash);

module.exports = User;