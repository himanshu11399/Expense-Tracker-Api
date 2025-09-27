import { CronJob } from "cron";
import https from "https";

// Runs every 20 seconds
const job = new CronJob("*/20 * * * *", () => {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET failed", res.statusCode);
      }
    })
    .on("error", (e) => console.error("Error while sending request", e));
});


job.start();
export default job;
