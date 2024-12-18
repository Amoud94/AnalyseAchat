import Sale from "../models/sale";
import { timePeriod } from "../utils/functions";
import { getCache, setCache } from '../utils/redis';


export const getSalesByProduct = async (periodFilter: string) => {
  const cacheKey = `api:analytics/SalesByProduct:${periodFilter}`;
  const ttlSeconds = 300;
  const { startDate, endDate } = timePeriod(periodFilter);
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  const salesByProduct = await Sale.aggregate([
    {
      $match: {
        Date: { $gte: startDate, $lte: endDate }, // Filter by date range
      },
    },
    {
      $lookup: {
        from: "products", // Collection à joindre
        localField: "ProductID", // Champ dans la collection `sales`
        foreignField: "ProductID", // Champ correspondant dans `products`
        as: "productDetails", // Résultat joint
      },
    },
    {
      $unwind: "$productDetails", // Décompose les résultats pour chaque produit
    },
    {
      $group: {
        _id: "$ProductID", // Grouper par produit
        productName: { $first: "$productDetails.ProductName" }, // Récupérer le nom du produit
        quantitySold: { $sum: "$Quantity" }, // Somme des quantités vendues
        totalSales: {
          $sum: { $multiply: ["$productDetails.Price", "$Quantity"] },
        }, // Somme du montant total
      },
    },
    {
      $project: {
        _id: 0, // Ne pas inclure l'_id dans le résultat
        productName: 1,
        quantitySold: 1,
        totalSales: 1,
      },
    },
    {
      $sort: { totalSales: -1 }, // Trier par ventes totales (décroissant)
    },
  ]);
  interface MyData {
    productName: string;
    quantitySold: number;
    totalSales: number;
  }
  await setCache<MyData[]>(cacheKey, salesByProduct, ttlSeconds);

  return salesByProduct;
};

export const getSalesTotal = async (periodFilter: string) => {
  const cacheKey = `api:analytics/SalesTotal:${periodFilter}`;
  const ttlSeconds = 300;
  const { startDate, endDate } = timePeriod(periodFilter);
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  const sales = await Sale.aggregate([
    {
      $match: {
        Date: { $gte: startDate, $lte: endDate }, // Filter by date range
      },
    },
    {
      $lookup: {
        from: "products", // Join with the 'products' collection
        localField: "ProductID", // Field in Sale that refers to Product
        foreignField: "ProductID", // Field in Product that matches Sale's ProductID
        as: "productDetails", // Create a new field 'productDetails' to store joined data
      },
    },
    {
      $unwind: "$productDetails", // Unwind the productDetails array
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$productDetails.Price", "$Quantity"] } },
      },
    },
  ]);
  interface MyData {
    total: number;
  }
  await setCache<MyData>(cacheKey, sales[0]?.total || 0, ttlSeconds);

  return sales[0]?.total || 0;
};

export const getTopProducts = async (periodFilter: string) => {
  const cacheKey = `api:analytics/TopProducts:${periodFilter}`;
  const ttlSeconds = 300;
  const { startDate, endDate } = timePeriod(periodFilter);
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }  
  
  const result = await Sale.aggregate([
    {
      $match: {
        Date: { $gte: startDate, $lte: endDate }, // Filter by date range
      },
    },
    {
      $lookup: {
        from: "products", // Join with the 'products' collection
        localField: "ProductID", // Field in Sale that refers to Product
        foreignField: "ProductID", // Field in Product that matches Sale's ProductID
        as: "productDetails", // Create a new field 'productDetails' to store joined data
      },
    },
    {
      $unwind: "$productDetails", // Unwind the productDetails array
    },
    {
      $group: {
        _id: "$productDetails.ProductID",
        name: { $first: "$productDetails.ProductName" },
        totalSales: {
          $sum: { $multiply: ["$productDetails.Price", "$Quantity"] },
        },
        quantity: { $sum: "$Quantity" },
      },
    },
    { $sort: { quantity: -1 } },
    { $limit: 3 },

    { $project: { name: 1, quantity: 1, totalSales: 1 } },
  ]);
  interface MyData {
    name: string
    quantity: number;
    totalSales: number;
  }
  await setCache<MyData[]>(cacheKey, result, ttlSeconds);
  return result
};

export const getSalesByCategory = async (periodFilter: string) => {
  const cacheKey = `api:analytics/SalesByCategory:${periodFilter}`;
  const ttlSeconds = 300;
  const { startDate, endDate } = timePeriod(periodFilter);
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }  
  const totalSales = await getSalesTotal(periodFilter);
  const categories = await Sale.aggregate([
    {
      $match: {
        Date: { $gte: startDate, $lte: endDate }, // Filter by date range
      },
    },
    {
      $lookup: {
        from: "products", // Join with the 'products' collection
        localField: "ProductID", // Field in Sale that refers to Product
        foreignField: "ProductID", // Field in Product that matches Sale's ProductID
        as: "productDetails", // Create a new field 'productDetails' to store joined data
      },
    },
    {
      $unwind: "$productDetails", // Unwind the productDetails array
    },
    {
      $group: {
        _id: "$productDetails.Category", // Group by the Product Category
        totalSalesByCategory: {
          $sum: { $multiply: ["$productDetails.Price", "$Quantity"] },
        }, // Sum the TotalAmount for each category
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id", // Rename _id field to category
        percentage: {
          $multiply: [{ $divide: ["$totalSalesByCategory", totalSales] }, 100], // Calculate percentage
        },
        totalSalesByCategory: 1, // Include total sales in the result
      },
    },
  ]);
  interface MyData {
    category: string
    percentage: number;
    totalSalesByCategory: number;
  }
  await setCache<MyData[]>(cacheKey, categories, ttlSeconds);
  return categories;
};
