//Task 8: Provide an API for taking orders from other applications.
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/billingDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error:", err));

// =====================
// ✅ Schemas
// =====================

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  city: String,
  phone: String
});

const Customer = mongoose.model("Customer", customerSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  customerId: Number,
  product: String,
  amount: Number,
  orderDate: Date
});

const Order = mongoose.model("Order", orderSchema);

// =====================
// ✅ ROUTES
// =====================

// Home route (IMPORTANT for browser)
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// ---------------------
// Create Customer
// ---------------------
app.post("/customer", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.send("Customer created");
  } catch (err) {
    res.send(err.message);
  }
});

// ---------------------
// Create Order
// ---------------------
app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send("Order placed successfully");
  } catch (err) {
    res.send(err.message);
  }
});

// ---------------------
// Get All Orders
// ---------------------
app.get("/orders", async (req, res) => {
  const data = await Order.find();
  res.json(data);
});

// ---------------------
// Orders in last 5 days
// ---------------------
app.get("/orders/recent", async (req, res) => {
  const date = new Date();
  date.setDate(date.getDate() - 5);

  const data = await Order.find({
    orderDate: { $gte: date }
  });

  res.json(data);
});

// ---------------------
// Customer + Order JOIN (Ahmedabad filter)
// ---------------------
app.get("/report/ahmedabad", async (req, res) => {
  const data = await Order.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customer"
      }
    },
    { $unwind: "$customer" },
    {
      $match: {
        "customer.city": "Ahmedabad"
      }
    }
  ]);

  res.json(data);
});

// ---------------------
// Billing Report (Total per customer)
// ---------------------
app.get("/report/billing", async (req, res) => {
  const data = await Order.aggregate([
    {
      $group: {
        _id: "$customerId",
        totalSpent: { $sum: "$amount" },
        totalOrders: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customer"
      }
    },
    { $unwind: "$customer" },
    {
      $project: {
        name: "$customer.name",
        city: "$customer.city",
        totalSpent: 1,
        totalOrders: 1
      }
    }
  ]);

  res.json(data);
});

// =====================
// Start Server
// =====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});