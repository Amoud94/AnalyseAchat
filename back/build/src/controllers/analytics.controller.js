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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorySales = exports.getTrendingProducts = exports.getTotalSales = exports.getSalesProduct = void 0;
const analytics_service_1 = require("../services/analytics.service");
const getSalesProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterPeriod = req.query.period_time || '30days';
    const salesByProduct = yield (0, analytics_service_1.getSalesByProduct)(filterPeriod);
    res.json({ salesByProduct });
});
exports.getSalesProduct = getSalesProduct;
const getTotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterPeriod = req.query.period_time || '30days';
    const salesTotal = yield (0, analytics_service_1.getSalesTotal)(filterPeriod);
    res.json({ totalSales: salesTotal });
});
exports.getTotalSales = getTotalSales;
const getTrendingProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterPeriod = req.query.period_time || '30days';
    const topProducts = yield (0, analytics_service_1.getTopProducts)(filterPeriod);
    res.json({ trendingProducts: topProducts });
});
exports.getTrendingProducts = getTrendingProducts;
const getCategorySales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterPeriod = req.query.period_time || '30days';
    const categorySales = yield (0, analytics_service_1.getSalesByCategory)(filterPeriod);
    res.json({ categorySales });
});
exports.getCategorySales = getCategorySales;
