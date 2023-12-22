import chai from 'chai';
import supertest from 'supertest';
import { app } from '../src/app.js';
import sessionRouter from '../src/router/session.Router.js';

const expect = chai.expect;
const api = supertest(app);

describe('Testing SessionRouter', () => {
  it('Debería registrar un nuevo usuario', async () => {
    const userData = {
        firstName: "nameuser",
        lastName: "apellido",
        email: "emailuser",
        password: "contraseña",
    };

    const response = await api.post('/api/sessions/register').send(userData);
    expect(response.status).to.equal(200);
  });

  it('Debería iniciar sesión con un usuario válido', async () => {
    const credentials = {
      username: 'usuarioExistente',
      password: 'contraseñaExistente',
    };

    const response = await api.post('/api/sessions/login').send(credentials);
    expect(response.status).to.equal(200);
  });

  it('Debería cerrar sesión', async () => {
    const response = await api.get('/api/sessions/logout');
    expect(response.status).to.equal(200);
  });

  it('Debería obtener la sesión actual del usuario autenticado', async () => {
    const response = await api.get('/api/sessions/current');
    expect(response.status).to.equal(200);
  });

});