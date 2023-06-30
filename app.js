const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
const port = 1000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/users', userRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/Demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});