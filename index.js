const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();
const Redis = require('ioredis');

require('dotenv').config();

const CPU_CORE_COUNT = os.cpus().length;

if(cluster.isPrimary) {
  for(let i=0;i<CPU_CORE_COUNT;i++){
    cluster.fork();
  }
}
else{

  const redis = new Redis({
    host: process.env.AWS_CACHE_ENDPOINT,
    port: 6379,
    tls: {
      rejectUnauthorized: false,
    },
  });

  app.get('/', (req, res) => {
    res.send('Hello Aman Madhukar');
  });

  app.get('/pid', (req, res) => {
    res.send(`Req handled by worker: ${process.pid}, CPU Core Count: ${CPU_CORE_COUNT}`);
  });

  app.get('/heavy-task', async (req, res) => {
    try {
      const cacheKey = 'heavy-task-result';
    
      // 1. Check cache
      const cached = await redis.get(cacheKey);
      if (cached) {
        return res.send(`From Cache: ${cached}`);
      }
    
      // 2. Heavy computation
      let sum = 0;
      for (let i = 0; i <= 1000000000; i++) sum += i;
    
      // 3. Store in cache (TTL = 60 sec)
      await redis.set(cacheKey, sum, 'EX', 60);
    
      res.send(`Computed: ${sum}`);
    } catch (error) {
      res.send(`try catch error: ${error}`);
    }
  });
  
  app.listen(3000);
}