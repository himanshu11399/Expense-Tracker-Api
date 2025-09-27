import { sql } from '../config/db.config.js';

async function addTransaction(req, res) {
    try {
        const { title, amount, category, userid } = req.body;
        if (!title || !amount || !category || !userid) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transactions = await sql`
    INSERT INTO transactions(user_id,title,amount,category)
    VALUES(${userid},${title},${amount},${category})
    RETURNING *
    `

        console.log(transactions);
        res.status(201).json(transactions[0]);

    } catch (error) {
        console.log("Error in POST /api/transactions", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default addTransaction;