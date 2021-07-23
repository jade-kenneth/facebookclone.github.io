const express = require('express');
const app = express();
//mongo db library
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
//for security since our database consists of username of password of the admin
dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true , useUnifiedTopology: true},  (err, res) => {
    if (err) throw err;
    
    console.log('Database online');
    });

//reminder: server.js file we are going to initialize routes as middleware!!! 

// activate body parser in application
app.use(express.json());
app.use(cors())
//routeUrl will be appended to base path the '/app'

//this will append to /app and form as /app/routesUrls which is the sign up like this /app/signup
app.use('/app', routesUrls)
//server.js sends reuest  to route.js file that has the router.post
// which process post request and sends back a response
app.listen(4000, () => console.log('server is running'));