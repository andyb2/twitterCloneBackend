
const request = require('supertest');
const app = require('../app')

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

describe('logout user', () => {
    it('returns status code 204 when the user successfully logs out', async () => {
        const res = await request(app).delete('/auth/logout')
        expect(res.statusCode).toEqual(204);
    });
});
