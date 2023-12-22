import chai from 'chai';
import supertest from 'supertest';
import { app } from '../src/app.js';
import productsRouter from '../src/router/products.Router.js';

const expect = chai.expect;
const api = supertest(app);

describe('Testing ProductsManager', () => {
  it('Debería obtener todos los productos', async () => {
    const response = await api.get('/api/products');
    expect(response.status).to.equal(200);
  });

  it('Debería crear un nuevo producto', async () => {
    const newProductData = {
      title: 'Nuevo Producto',
      description: 'Descripción del nuevo producto',
      price: 999,
      thumbnail: 'URL del thumbnail',
      code: 'Código del nuevo producto',
      stock: 10,
    };

    const response = await api.post('/api/products').send(newProductData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id'); 
    productId = response.body._id;
  });

  it('Debería actualizar un producto existente', async () => {
    expect(productId).to.be.a('string')

    const updatedProductData = {
      title: 'Producto Actualizado',
      description: 'Nueva descripción del producto',
      price: 39.99,
      thumbnail: 'Nueva URL del thumbnail',
      code: 'Nuevo código del producto',
      stock: 20,
    };

    const response = await api.put(`/api/products/${productId}`).send(updatedProductData);
    expect(response.status).to.equal(200);
  });

  it('Debería eliminar un producto existente', async () => {
    expect(productId).to.be.a('string')

    const response = await api.delete(`/api/products/${productId}`);
    expect(response.status).to.equal(200);
  });

});
