import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, product });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Unable to create product.' });
  }
}

export async function getProducts(req, res) {
  try {
    const { search, category, sort } = req.query;
    const query = {};
    if (search?.trim()) query.name = { $regex: escapeRegex(search.trim()), $options: 'i' };
    if (category?.trim()) query.category = category.trim();

    const order = sort === 'price_asc' ? { price: 1 } : sort === 'price_desc' ? { price: -1 } : { createdAt: -1 };
    const products = await Product.find(query).select('name description price category image stock createdAt').sort(order);
    return res.json({ success: true, count: products.length, products });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load products.' });
  }
}

export async function getProductById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID.' });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    return res.json({ success: true, product });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load product.' });
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
