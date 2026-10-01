import { Router } from 'express';
import { createProduct, getProductById, getProducts } from '../controllers/product.controller.js';

const router = Router();
router.route('/').post(createProduct).get(getProducts);
router.get('/:id', getProductById);

export default router;
