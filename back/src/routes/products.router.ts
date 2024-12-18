import { Router } from 'express';
import { fetchProducts } from '../controllers/products.controller';
const router = Router();
router.get('/', fetchProducts);
export default router;
