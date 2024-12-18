import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

export const setCache = async <T>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value);
    await redisClient.setEx(key, ttlSeconds, stringValue); // Set key with expiration
    console.log(`Cache set for key: ${key}, expires in ${ttlSeconds} seconds`);
  } catch (error) {
    console.error("Error setting cache: ", key + " " + error);
  }
};

// A utility function to retrieve cached data
export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await redisClient.get(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
};
