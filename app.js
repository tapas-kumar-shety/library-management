require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const User  = require ('./server/models/user');
const connectDB = require('./server/config/db');
const bcrypt = require ('bcrypt')


const app = express();
const port = process.env.PORT || 5000;

// Connect to Database  
connectDB();

app.use(express.urlencoded({ extended: true }));  
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


app.get('/login', (req, res) => {
    const errorMessage = req.session.errorMessage || '';  
    req.session.errorMessage = null;  
    res.render('login', { errorMessage });
});


app.get('/addAdmin',requirelogin,(req,res)=>{
    res.render('addAdmin')
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
 app.post('/addAdmin',async(req,res)=>{      
    const {userName,password} = req.body      
  const user = new User ({userName,password})
  await user.save()
  req.session.user_id = user._id; 
  req.session.userName = user.userName;
  res.redirect('/')
})



 app.get('/logout', (req, res) => {
    req.session.destroy();  
    res.redirect('/');  
});

//// LOGOUT POST
app.post('/logout', (req, res) => {
    req.session.destroy(); 
    res.redirect('/'); 
});



app.listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`)
});
