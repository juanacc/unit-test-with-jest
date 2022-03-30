const supertest = require('supertest');
const app = require('../index');
const User = require('../model/user');
describe('#user', () => {
  beforeAll(async () => {
    await supertest(app)
      .post('/api/user/sign-up')
      .send({
        name: 'Ayush Kumar',
        email: 'ayush@gmail.com',
        password: '123456',
      })
      .expect(201);
  });
  afterAll(async () => {
    await User.deleteMany();
  });
  describe('#handleSignUp', () => {
    describe('should not register user', () => {
      describe('when email already exists', () => {
        test('return success false', async () => {
          const response = await supertest(app)
            .post('/api/user/sign-up')
            .send({
              name: 'Ayush Kumar',
              email: 'ayush@gmail.com',
              password: '123456',
            })
            .expect(400);
          expect(response.body.message).toBe('User already exists');
        });
      });
      describe('when passowrd is missing', () => {
        test('return success false', async () => {
          const response = await supertest(app)
            .post('/api/user/sign-up')
            .send({
              name: 'Ayush Kumar',
              email: 'ayush+1@gmail.com',
            })
            .expect(400);
          expect(response.body.message).toBe('User validation failed: password: Path `password` is required.');
        });
      });
      describe('when name is missing', () => {
        test('return success false', async () => {
          const response = await supertest(app)
            .post('/api/user/sign-up')
            .send({
              email: 'ayush+1@gmail.com',
              password: 'password',
            })
            .expect(400);
          expect(response.body.message).toBe('User validation failed: name: Path `name` is required.');
        });
      });
      describe('when email is missing', () => {
        test('return success false', async () => {
          const response = await supertest(app)
            .post('/api/user/sign-up')
            .send({
              name: 'Ayush Kumar',
              password: 'password',
            })
            .expect(400);
          expect(response.body.message).toBe('User validation failed: email: Path `email` is required.');
        });
      });
    });
    describe('should create user', () => {
      describe('when details is valid', () => {
        test('should return success true', async () => {
          const res = await supertest(app)
            .post('/api/user/sign-up')
            .send({
              name: 'Ayush Kumar',
              email: 'kumarayush731@gmail.com',
              password: '123456',
            })
            .expect(201);
          expect(res.body.message).toBe('User created successfully');
          expect(res.body.user.name).toBe('Ayush Kumar');
          expect(res.body.user.email).toBe('kumarayush731@gmail.com');
        });
      });
    });
  });
});