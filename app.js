require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const User  = require ('./server/models/user');
const connectDB = require('./server/config/db');
const bcrypt = require ('bcrypt')

// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const pdfRoutes = require('./server/routes/pdfRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database  
connectDB();

app.use(express.urlencoded({ extended: true }));  // These two lines help to grab the data when a new student is added, etc.
app.use(session({secret: 'nonrealistic'}))

const requirelogin = require('./authMdlwr')

// Middleware to pass the logged-in user's name to every view
app.use((req, res, next) => {
    res.locals.userName = req.session.userName;
    next();
  });
  

app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));


// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/student'))
// app.use('/pdf', pdfRoutes);

app.get('/login', (req, res) => {
    const errorMessage = req.session.errorMessage || '';  // Retrieve the error message, if exists
    req.session.errorMessage = null;  // Clear the message after showing it
    res.render('login', { errorMessage });
});


app.get('/signup',requirelogin,(req,res)=>{
    res.render('signup')
})

// Handle 404
// app.get('*', (req, res) => {
//     res.status(404).render('404');
// });

///// loign post 
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    const foundUser = await User.findAndValidate(userName, password);

    if (foundUser) {
        req.session.user_id = foundUser._id;
        req.session.userName = foundUser.userName;
        res.redirect('/dash');
    } else {
        req.session.errorMessage = "Invalid username or password";
        res.redirect('/login');
    }
});


 // signup post 
 app.post('/signup',async(req,res)=>{      
    const {userName,password} = req.body      
  const user = new User ({userName,password})
  await user.save()
  req.session.user_id = user._id; 
  req.session.userName = user.userName;
  res.redirect('/')
})



 
 app.get('/logout', (req, res) => {
    req.session.destroy();  // Destroy the session
    res.redirect('/');  // Redirect to the homepage after logout
});

//// LOGOUT POST
app.post('/logout', (req, res) => {
    req.session.destroy(); 
    res.redirect('/'); 
});



app.get('/pdf',(req,res)=>{
   res.render('pdf')
})


app.listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`)
});
