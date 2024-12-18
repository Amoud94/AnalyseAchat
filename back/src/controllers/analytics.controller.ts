import { Request, Response } from 'express';
import { getSalesTotal, getTopProducts, getSalesByCategory, getSalesByProduct } from '../services/analytics.service';

export const getSalesProduct = async (req: Request, res: Response) => {
  const filterPeriod  = (req.query.period_time as string) || '30days'
  const salesByProduct = await getSalesByProduct(filterPeriod);
  res.json({ salesByProduct });
};

export const getTotalSales = async (req: Request, res: Response) => {
  const filterPeriod  = (req.query.period_time as string) || '30days'
  const salesTotal = await getSalesTotal(filterPeriod);
  res.json({ totalSales: salesTotal });
};

export const getTrendingProducts = async (req: Request, res: Response) => {
  const filterPeriod  = (req.query.period_time as string) || '30days'
  const topProducts = await getTopProducts(filterPeriod);
  res.json({ trendingProducts: topProducts });
};

export const getCategorySales = async (req: Request, res: Response) => {
  const filterPeriod  = (req.query.period_time as string) || '30days'
  const categorySales = await getSalesByCategory(filterPeriod);
  res.json({ categorySales });
};
