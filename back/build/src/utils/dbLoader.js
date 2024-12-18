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
const connection_1 = __importDefault(require("../db/connection"));
const product_1 = __importDefault(require("../models/product"));
const sale_1 = __importDefault(require("../models/sale"));
const csvToJSON_1 = require("./csvToJSON");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)();
    console.log('Seeding database...');
    // Parse CSV files with defined types
    const products = yield (0, csvToJSON_1.parseCSV)('data/products.csv');
    const sales = yield (0, csvToJSON_1.parseCSV)('data/sales.csv');
    // Clear existing data
    yield product_1.default.deleteMany({});
    yield sale_1.default.deleteMany({});
    // Insert new data
    yield product_1.default.insertMany(products);
    yield sale_1.default.insertMany(sales);
    console.log('Database seeded successfully!');
    process.exit(0);
});
seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
});
