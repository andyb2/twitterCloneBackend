# Twitter Clone Back-end

## Description

The back-end for this project **ONLY** includes user account registration, login, and logout at this time.

## Tech Used

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Instructions

1. Open bash or terminal
2. type psql
3. type CREATE DATABASE twttrclone
4. create .env in server folder
5. in .env create a SESSION_SECRET
6. in .env create a DATABASE_URL
7. install dependencies using npm i
8. type "npm run seed" to test if the database is connected
9. to run tests type "npm run test"

Notes: `All tests will pass the first time. If the test is run again it will fail the register test because the user has been created in the database. To remove this entry and run the tests again please type "npm run seed" to remove the test user from the database.`

## Testing

    Tests were created using Jest/Supertest
