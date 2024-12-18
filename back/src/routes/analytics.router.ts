import { Router } from 'express';
import { getTotalSales, getTrendingProducts, getCategorySales, getSalesProduct } from '../controllers/analytics.controller';

const router = Router();

router.get('/sales_by_product', getSalesProduct);
router.get('/total_sales', getTotalSales);
router.get('/trending_products', getTrendingProducts);
router.get('/category_sales', getCategorySales);

export default router;
