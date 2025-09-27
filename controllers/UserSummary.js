import {sql} from '../config/db.config.js';

//User Summary
export default async function UserSummary(req, res) {
    try {
            const { userid } = req.params;
            if (!userid) {
                return res.status(400).json({ message: "User id is required" });
            }
    
    
            const balanceResult = await sql`
             SELECT COALESCE(SUM(amount),0) AS balance
             FROM transactions
             WHERE user_id=${userid}`
    
            const incomeResult = await sql`
             SELECT COALESCE(SUM(amount),0) AS income
             FROM transactions
             WHERE user_id=${userid} AND amount>0`
    
            const expenseResult = await sql`
             SELECT COALESCE(SUM(amount),0) AS expense
             FROM transactions
             WHERE user_id=${userid} AND amount<0`
    
            res.status(200).json({
                balance: parseFloat(balanceResult[0].balance),
                income: parseFloat(incomeResult[0].income),
                expense: parseFloat(expenseResult[0].expense)
            })
    
        } catch (error) {
            console.log("Error in GET /api/transactions/summary/:userid", error);
            res.status(500).json({ message: "Error in Fetching the Summary of the user" });
        }
}