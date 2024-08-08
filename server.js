const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const tokenRoutes = require('./routes/token');

const app = express();
app.use(express.json()); 
app.use(cors());


const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tokens', tokenRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//we changed this buy me and the chagnes are here
//ne file
