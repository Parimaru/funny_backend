const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
const connectDB = require('./dbinit');

connectDB();

const quoteDataRoutes = require('./routes/quoteData');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.use('/qData', quoteDataRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(PORT, () => {
  console.log(`server listening on Port ${PORT}`);
});
