import {sql} from '../config/db.config.js';

//Delete a specific user transaction
export default async function deleteSpecificUserTransaction(req, res) {
    try {
            const { id, userid } = req.params;
    
            if (isNaN(parseInt(id))) {
                return res.status(400).json({ message: " Id must be a number" });
            }
            if (!id) {
                return res.status(400).json({ message: "Transaction id is required" });
            }
            if (!userid) {
                return res.status(400).json({ message: "User id is required" });
            }
            const transaction = await sql`
            DELETE FROM transactions
            WHERE id=${id} AND user_id=${userid}
            RETURNING *
            `
            if (transaction.length === 0) {
                return res.status(404).json({ message: "Transaction not found" });
            }
    
            return res.status(200).json({ message: "Transaction deleted successfully" });
    
        } catch (error) {
            console.log("Error in DELETE /api/transactions/delete/:userid/:id", error);
            res.status(500).json({ message: "Internal server error" });
        }
}