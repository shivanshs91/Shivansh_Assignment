const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the table data
const foodItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  label: String,
  price: Number,
  description: String,
});

// Create a model for the table data
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

// API endpoint to fetch table data
app.get('/api/fooditems', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to update price in the database
app.put('/api/fooditems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    await FoodItem.findByIdAndUpdate(id, { price });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});