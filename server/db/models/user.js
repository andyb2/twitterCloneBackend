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

const setSaltAndPassword = async (user) => {
    if (user.changed("password")) {
        const passwordHash = await bcrypt.hash(user.password(), 10)
        user.password = passwordHash
    }
    // const isvalid = await bcrypt.compare('123456', user.password())
    // console.log(isvalid)
};


User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;