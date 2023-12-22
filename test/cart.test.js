import chai from 'chai';
import supertest from 'supertest';
import { app } from '../src/app.js';
import cartsRouter from '../src/router/carts.Router.js';

const expect = chai.expect;
const api = supertest(app);

describe('Testing CartRouter', () => {
  let cartId; 

  it('Debería obtener un carrito por ID', async () => {
    expect(cartId).to.be.a('string');

    const response = await api.get(`/api/carts/${cartId}`);
    expect(response.status).to.equal(200);
  });

  it('Debería agregar un nuevo carrito', async () => {
    const response = await api.post('/api/carts');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id'); 
    cartId = response.body._id; 
  });

  it('Debería actualizar un carrito por ID y producto ID', async () => {
    expect(cartId).to.be.a('string');

    const productId = 'productoId'; 
    const response = await api.put(`/api/carts/${cartId}/products/${productId}`);
    expect(response.status).to.equal(200);
  });

  it('Debería actualizar un carrito por producto ID', async () => {
    expect(cartId).to.be.a('string');

    const productId = 'productoId';
    const response = await api.put(`/api/carts/products/${productId}`);
    expect(response.status).to.equal(200);
  });

  it('Debería eliminar un carrito por ID', async () => {
    expect(cartId).to.be.a('string');

    const response = await api.delete(`/api/carts/${cartId}`);
    expect(response.status).to.equal(200);
  });

});
