const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure this is here
const cors = require("cors");

const expenseRoutes = require("./routes/expenses.js");
const authRoutes = require("./routes/auth.js")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure the URI is correct and includes a database name)
// const mongoURI =
//   "mongodb+srv://himanshu:<Himanshu@1>@alconomy.zsqggp1.mongodb.net/?retryWrites=true&w=majority&appName=Alconomy";
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
