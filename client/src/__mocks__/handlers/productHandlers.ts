import { delay } from '../utils/delay';
import {
  // products,
  // Product,
  allProducts,
  relatedProducts,
  productDetails,
  searchProducts as productSearch,
} from '../data/products';
import { mockResponse } from '../utils/response';

export const getAllProducts = async (perPage: number) => {
  await delay(200);
  const response = await allProducts(perPage);
  return mockResponse(200, response);
};

export const getProductDetails = async (productId: number) => {
  await delay(200);
  const response = await productDetails(productId);
  return mockResponse(200, response);
};

export const getRelatedProducts = async (category: string, perPage: number) => {
  await delay(200);
  const response = await relatedProducts(category, perPage);
  return mockResponse(200, response);
};

export const searchProducts = async (searchString: string, perPage: number) => {
  await delay(200);
  const response = await productSearch(searchString, perPage);
  return mockResponse(200, response);
};
