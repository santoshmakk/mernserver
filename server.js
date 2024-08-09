const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const tokenRoutes = require('./routes/token');

const passport=require('passport');
const localStatergy = require('passport-local').Strategy;

const app = express();
app.use(express.json()); 
app.use(cors());


const PORT = process.env.PORT || 5000;

const logRequest =  (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);

// app.use(new localStatergy(async (email,password,done)=>{
//   //authenicating login
//   try {
    
//   } catch (error) {
//     console.error("login statergy failed!")
//   }
// }))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err)); 

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tokens', tokenRoutes);

app.get('/',(req,res)=>{
  res.status(200).send('Welcome to mearn server!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//we changed this buy me and the chagnes are here
//ne file
