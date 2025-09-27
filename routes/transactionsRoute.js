import express from "express";
import getAllTransactions from '../controllers/gettransactions.controller.js';
import addTransaction from '../controllers/addtransaction.js';
import deleteSpecificUserTransaction from '../controllers/deletespecificuser.js';
import deleteAllUserTransactions from '../controllers/deleteall.js';
import UserSummary from '../controllers/UserSummary.js';

const router = express.Router();

//Get the user Summary
router.get("/summary/:userid", UserSummary);

//Get all transactions of a user
router.get("/:userid",getAllTransactions);

//Add a new Transaction
router.post("/", addTransaction);

//Delete the specific transaction
router.delete("/delete/:userid/:id",deleteSpecificUserTransaction);

//Delete all transactions of a user
router.delete("/delete/:userid", deleteAllUserTransactions);




export default router;