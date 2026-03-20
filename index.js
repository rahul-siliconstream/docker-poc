const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();

const CPU_CORE_COUNT = os.cpus().length;

if(cluster.isPrimary) {
  for(let i=0;i<CPU_CORE_COUNT;i++){
    cluster.fork();
  }
}
else{

  app.get('/', (req, res) => {
    res.send('Hello Aman Madhukar');
  });

  app.get('/pid', (req, res) => {
    res.send('Req handled by worker: ',process.pid,' CPU Core Count: ',CPU_CORE_COUNT);
  });
  
  app.listen(3000);
}