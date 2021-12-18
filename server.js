const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;
const cors = require('cors');
const Cron = require("croner");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


async function getOpenSeaData() {
  return;
};


app.prepare().then(async () => {
  const server = express();

  // redirect to SSL
  server.use(sslRedirect());
  server.use(cors());


  server.all('*', (req, res) => {
    return handle(req, res);
  });

  async function setupCronJobs() {
    Cron("0 * * * * *", async () => {
      console.log("[CRON]", "starting minute tasks");
      await getOpenSeaData();
    });

    Cron("0 0 * * * *", async () => {
      console.log("[CRON]", "starting hour tasks");

    });

    Cron("0 0 0 * * *", async () => {
      console.log("[CRON]", "starting day tasks");

    });

    Cron("0 0 0 * * 1", async () => {
      console.log("[CRON]", "starting week tasks");

    });

    Cron("0 0 0 1 * *", async () => {
      console.log("[CRON]", "starting month tasks");

    });
  }



  await setupCronJobs();


  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});