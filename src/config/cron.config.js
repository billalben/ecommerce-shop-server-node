const cron = require("node-cron");
const https = require("https");

const URL = "https://ecommerce-shop-server-qfuo.onrender.com";

const job = new cron.schedule("*/10 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log(`GET request sent`);
      } else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
});

module.exports = job;

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals or specific times
// send 1 GET request for every 10 minutes

// Schedule:
// You define a schedule using a cron expression, which consists of five fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 10 * * * * - Every 10 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour
