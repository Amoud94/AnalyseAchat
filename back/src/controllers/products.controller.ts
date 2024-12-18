import { Request, Response } from 'express';
import { getProducts } from '../services/products.service';

export const fetchProducts = async (req: Request, res: Response) => {
  const page  = req.query.page as string
  const limit  = req.query.limit as string

  const products = await getProducts(page, limit);
  res.json({ ... products });
};
