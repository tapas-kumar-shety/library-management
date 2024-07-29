require('dotenv').config();



const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');

// // npm install connect-flash
// const flash = require('connect-flash');

// const { flash } = require('express-flash-message');
// const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database  
connectDB();


app.use(express.urlencoded({ extended: true }));  //// THESE TWO LINES HELP US TO GRAB THE DATA 
app.use(express.json());                   /// S.T WHEN A NEW CUSTOMER IS ADDED ETC...
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));


// Express Session
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     }
//   })
// );

// Flash Messages
// app.use(flash({ sessionKeyName: 'flashMessage' }));


// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// Routes
app.use('/', require('./server/routes/customer'))

// app.get('/', (req, res) => {
//   res.render("default");
// });


// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
  });
  
app.listen(port,()=>{
    console.log(`app is listening to port  http://localhost:${port}`)
})