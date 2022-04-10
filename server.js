const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRoutes);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
