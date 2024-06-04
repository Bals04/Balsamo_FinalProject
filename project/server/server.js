const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./strategies/local-strategy.js'); // Adjust the path to your Passport setup file
// Import routes
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser('secret'))
app.use(
  session({
    secret: 'balsdev',
    saveUninitialized: false,
    resave: false,
    cookie:{
      maxAge: 60000 * 60, 

    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRoutes); // Mount the routes to /api


app.post(
  '/auth',
  passport.authenticate('local'),
  (req, res) =>{
    res.sendStatus(200)
  }
)
app.post('/auth/logout',(req, res) =>{
    if(!req.user) return res.sendStatus(401);
    req.logout((err)=>{
      if(err) return res.sendStatus(400);
      res.sendStatus(200)
    })
  })
app.get('/api/auth/status', (req, res) =>{
  console.log("INSIDE THE AUTH STATUS");
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus
})


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
