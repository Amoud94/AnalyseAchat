"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesByCategory = exports.getTopProducts = exports.getSalesTotal = exports.getSalesByProduct = void 0;
const sale_1 = __importDefault(require("../models/sale"));
const functions_1 = require("../utils/functions");
const redis_1 = require("../utils/redis");
const getSalesByProduct = (periodFilter) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `api:analytics/SalesByProduct:${periodFilter}`;
    const ttlSeconds = 300;
    const { startDate, endDate } = (0, functions_1.timePeriod)(periodFilter);
    const cachedData = yield (0, redis_1.getCache)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const salesByProduct = yield sale_1.default.aggregate([
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
    yield (0, redis_1.setCache)(cacheKey, salesByProduct, ttlSeconds);
    return salesByProduct;
});
exports.getSalesByProduct = getSalesByProduct;
const getSalesTotal = (periodFilter) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const cacheKey = `api:analytics/SalesTotal:${periodFilter}`;
    const ttlSeconds = 300;
    const { startDate, endDate } = (0, functions_1.timePeriod)(periodFilter);
    const cachedData = yield (0, redis_1.getCache)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const sales = yield sale_1.default.aggregate([
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
    yield (0, redis_1.setCache)(cacheKey, ((_a = sales[0]) === null || _a === void 0 ? void 0 : _a.total) || 0, ttlSeconds);
    return ((_b = sales[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
});
exports.getSalesTotal = getSalesTotal;
const getTopProducts = (periodFilter) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `api:analytics/TopProducts:${periodFilter}`;
    const ttlSeconds = 300;
    const { startDate, endDate } = (0, functions_1.timePeriod)(periodFilter);
    const cachedData = yield (0, redis_1.getCache)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const result = yield sale_1.default.aggregate([
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
    yield (0, redis_1.setCache)(cacheKey, result, ttlSeconds);
    return result;
});
exports.getTopProducts = getTopProducts;
const getSalesByCategory = (periodFilter) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `api:analytics/SalesByCategory:${periodFilter}`;
    const ttlSeconds = 300;
    const { startDate, endDate } = (0, functions_1.timePeriod)(periodFilter);
    const cachedData = yield (0, redis_1.getCache)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const totalSales = yield (0, exports.getSalesTotal)(periodFilter);
    const categories = yield sale_1.default.aggregate([
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
    yield (0, redis_1.setCache)(cacheKey, categories, ttlSeconds);
    return categories;
});
exports.getSalesByCategory = getSalesByCategory;
