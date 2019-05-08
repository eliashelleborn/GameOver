import Redis from 'redis';

const redis = Redis.createClient({
  /* path: process.env.REDIS_URL, */
});

redis.flushdb();

redis.on('ready', () => console.log('✅  | Connected to Redis server'));
redis.on('error', () => console.log('❌  | Could not establish connection to Redis server'));

export default redis;
