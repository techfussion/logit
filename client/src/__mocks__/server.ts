import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserById, getAllUsers } from './handlers/userHandlers';
import {
  getAllProducts,
  getRelatedProducts,
  getProductDetails,
  searchProducts,
} from './handlers/productHandlers';

const mock = new MockAdapter(axios, { delayResponse: 200 });

export const initializeMockServer = (): void => {

  // Product endpoints

  // ----- endpoint example: api/shop/products?page=1&perPage=10
  mock.onGet(/\/api\/shop\/products\?perPage=\d+/).reply(async (config) => {
    const urlParams = new URLSearchParams(config.url?.split('?')[1]);
    const perPage = parseInt(urlParams.get('perPage') || '10', 10);

    const response = await getAllProducts(perPage);
    return [response.status, response.data];
  });

  // ----- endpoint example: api/shop/related-products?page=1&perPage=10
  mock
    .onGet(/\/api\/shop\/related-products\?category=[^&]+&perPage=\d+/)
    .reply(async (config) => {
      const urlParams = new URLSearchParams(config.url?.split('?')[1]);
      const category = urlParams.get('category') || '';
      const perPage = parseInt(urlParams.get('perPage') || '10', 10);

      const response = await getRelatedProducts(category, perPage);
      return [response.status, response.data];
    });

  // ----- endpoint example: api/shop/product/details?productId=1
  mock
    .onGet(/\/api\/shop\/product\/details\?productId=\d+/)
    .reply(async (config) => {
      const urlParams = new URLSearchParams(config.url?.split('?')[1]);
      const productId = parseInt(urlParams.get('productId') || '');

      const response = await getProductDetails(productId);
      return [response.status, response.data];
    });

  // ----- endpoint example: api/shop/search
  mock
    .onGet(/\/api\/shop\/search\?searchString=[^&]+&perPage=\d+/)
    .reply(async (config) => {
      const urlParams = new URLSearchParams(config.url?.split('?')[1]);
      const perPage = parseInt(urlParams.get('perPage') || '10', 10);
      const searchString = urlParams.get('searchString') || '';

      const response = await searchProducts(searchString, perPage);
      return [response.status, response.data];
    });

  // Default handler for unhandled routes
  mock.onAny().reply(404, { error: 'Endpoint not found' });
};
