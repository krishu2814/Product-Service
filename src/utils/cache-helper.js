const { getRedisClient } = require("../config/redis");

/**
 * Fetch cached JSON value by key.
 *
 * @param {string} key
 * @returns {Promise<Object|null>}
 */
async function getCache(key) {
  try {
    const redis = getRedisClient();
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.warn(`[Cache Get Warning] Error reading key ${key}:`, error.message);
    return null;
  }
}

/**
 * Set cached JSON value with TTL expiration.
 *
 * @param {string} key
 * @param {any} value
 * @param {number} [ttlSeconds=300] - Default: 300s (5 minutes)
 */
async function setCache(key, value, ttlSeconds = 300) {
  try {
    const redis = getRedisClient();
    const serialized = JSON.stringify(value);
    await redis.set(key, serialized, "EX", ttlSeconds);
  } catch (error) {
    console.warn(`[Cache Set Warning] Error writing key ${key}:`, error.message);
  }
}

/**
 * Delete a specific cache key.
 *
 * @param {string} key
 */
async function deleteKey(key) {
  try {
    const redis = getRedisClient();
    await redis.del(key);
  } catch (error) {
    console.warn(`[Cache Del Warning] Error deleting key ${key}:`, error.message);
  }
}

/**
 * Non-blocking deletion of keys matching a pattern using SCAN.
 *
 * @param {string} pattern - e.g. "products:list:*"
 */
async function deletePattern(pattern) {
  try {
    const redis = getRedisClient();
    let cursor = "0";

    do {
      const [nextCursor, keys] = await redis.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        100,
      );
      cursor = nextCursor;

      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== "0");
  } catch (error) {
    console.warn(
      `[Cache DelPattern Warning] Error invalidating pattern ${pattern}:`,
      error.message,
    );
  }
}

module.exports = {
  getCache,
  setCache,
  deleteKey,
  deletePattern,
};
