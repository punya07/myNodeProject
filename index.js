
//MVC 
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = 7000;

// const host = 'localhost';

const MONGO_URL = 'mongodb://127.0.0.1:27017/Punya_Node';


app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.get("/",function(req, res){return res.send("Home Route")}) 

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();
