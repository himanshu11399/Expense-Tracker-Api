import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.config.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import job from "./config/cron.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use(rateLimiter); // Apply rate limiter middleware to all routes
if(process.env.NODE_ENV==="production") job.start();

// Security headers
app.use(helmet());

// Logging requests
app.use(morgan("combined"));

// Gzip compression
app.use(compression());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


//It is used to connect the database and write the sql queries
async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`

        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
initDB();

app.get("/api/health",(req,res)=>{
    res.status(200).json({status:"ok"});
})

//Use the transactions route for all transaction-related endpoints
app.use('/api/transactions', transactionsRoute);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});