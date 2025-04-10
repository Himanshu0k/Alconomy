const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense.js"); // Fixed require path

// POST endpoint to create a new expense
router.post("/", async (req, res) => {
  const { description, amount } = req.body;
  if (!description || !amount) {
    return res
      .status(400)
      .json({ error: "Please provide description, amount or quantity" });
  }
  try {
    const newExpense = new Expense({ description, amount});
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ error: "Server error" });
  }
});




router.get("/hello", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
