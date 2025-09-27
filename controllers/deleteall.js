import {sql} from '../config/db.config.js';

//Delete all transactions of a user
export default async function deleteAllUserTransactions(req, res) {
    try {
            const { userid } = req.params;
            if (!userid) {
                return res.status(400).json({ message: "User id is required" });
            }
            const transaction = await sql`
            DELETE FROM transactions
            WHERE user_id=${userid}
            RETURNING *
            `
            if (transaction.length === 0) {
                return res.status(404).json({ message: "No transactions found for this user" });
            }
            return res.status(200).json({ message: "All transactions deleted successfully" });
        } catch (error) {
            console.log("Error in DELETE /api/transactions/delete/:userid", error);
            res.status(500).json({ message: "Error in delete all transaction of the user" });
        }
}
