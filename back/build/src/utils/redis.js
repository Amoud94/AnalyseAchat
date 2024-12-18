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
exports.getCache = exports.setCache = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: parseInt(process.env.REDIS_PORT || "6379", 10),
    },
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        console.log("Connected to Redis");
    }
    catch (error) {
        console.error("Error connecting to Redis:", error);
    }
}))();
const setCache = (key, value, ttlSeconds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stringValue = JSON.stringify(value);
        yield redisClient.setEx(key, ttlSeconds, stringValue); // Set key with expiration
        console.log(`Cache set for key: ${key}, expires in ${ttlSeconds} seconds`);
    }
    catch (error) {
        console.error("Error setting cache: ", key + " " + error);
    }
});
exports.setCache = setCache;
// A utility function to retrieve cached data
const getCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        console.error("Error getting cache:", error);
        return null;
    }
});
exports.getCache = getCache;
