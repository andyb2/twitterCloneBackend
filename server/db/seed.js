const db = require("./db");
const { User } = require("./models");

console.log(User.password)
const dbSeed = async () => {
    await db.sync({ force: true })
    await User.create({
        username: "charles",
        email: "charles@email.com",
        password: "123456",
    })
}

async function runSeed() {
    console.log("seeding db");
    try {
        await dbSeed();
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    } finally {
        await db.close();
        console.log("db connection closed");
    }
}

runSeed();