// controllers/addtransaction.js
import { sql } from '../config/db.config.js';

async function getAllTransactions(req,res){
    try {
            const { userid } = req.params;
            if (!userid) {
                return res.status(400).json({ message: "User id is required" });
            }
            const transaction = await sql`
            SELECT *FROM transactions
            WHERE user_id=${userid}
            ORDER BY created_at DESC`
    
            res.status(200).json(transaction);
        } catch (error) {
            console.log("Error in GET /api/transactions/:userid", error);
            res.status(500).json({ message: "Errorin fetching from the Database!!..." });
        }
}
export default getAllTransactions;