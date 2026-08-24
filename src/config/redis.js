const Redis = require("ioredis");
const { REDIS_URL } = require("./serverConfig");

let redisClient = null;

function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      retryStrategy(times) {
        const delay = Math.min(times * 100, 3000);
        return delay;
      },
    });

    redisClient.on("connect", () => {
      console.log("[Redis] Product Service connected to Redis successfully");
    });

    redisClient.on("error", (err) => {
      console.error("[Redis Error] Product Service Redis error:", err.message);
    });
  }

  return redisClient;
}

module.exports = {
  getRedisClient,
};
