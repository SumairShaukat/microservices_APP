import Product from '../models/productModel.js';
import cacheService from './services/cacheService.js'

export const getProducts = async (req, res, next) => {
  try {
    const products = await cacheService.getOrSetCache('products', async () => {
      return await Product.find();
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
