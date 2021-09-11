const request = require('supertest');
const app = require('../app');

describe('register password length less than 6 characters', () => {
    it('returns status code 400 if user inputs incorrect password min', async () => {
        const res = await request(app).post('/auth/register')
            .send({
                username: "Todd",
                password: '12345',
                email: 'todd@test.com',
            })
        expect(res.statusCode).toEqual(400);

    })
})

describe('user forgets to input email on registration', () => {
    it('returns status code 400 if user forgets email input', async () => {
        const res = await request(app).post('/auth/register')
            .send({
                username: "Todd",
                password: '123456',
            })
        expect(res.statusCode).toEqual(400);

    })
})

describe('register', () => {
    it('returns status code 201 if user successfully registered', async () => {
        const res = await request(app).post('/auth/register')
            .send({
                username: "Todd",
                password: '123456',
                email: 'todd@test.com',
            })
        expect(res.statusCode).toEqual(201);

    })
})

describe('logout user', () => {
    it('returns status code 204 when the user successfully logs out', async () => {
        const res = await request(app).delete('/auth/logout')
        expect(res.statusCode).toEqual(204);
    });
});

describe('login wrong password', () => {
    it('returns status code 401 if the user inputs wrong password', async () => {
        const res = await request(app).post('/auth/login')
            .send({
                username: 'Todd',
                password: '123455'
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe('login wrong username', () => {
    it('returns status code 401 if the user inputs wrong username', async () => {
        const res = await request(app).post('/auth/login')
            .send({
                username: 'Todd1',
                password: '123456'
            });
        console.log(`RES`, res.statusCode)
        expect(res.statusCode).toEqual(401);
    });
});

describe('login', () => {
    it('returns status code 201 if the user successfully logs in', async () => {
        const res = await request(app).post('/auth/login')
            .send({
                username: 'Todd',
                password: '123456'
            });
        expect(res.statusCode).toEqual(201);
    });
});


