const express= require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const connectDB = require('./config/db')
const session = require('express-session')

// Load config
dotenv.config({path:"./config/config.env"});

// Passport config
require('./config/passport')(passport)
// Connect DB
connectDB()

const app = express()
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000;

// HandleBars setup

app.engine('.hbs', exphbs({defaultLayout: 'main', extname:'.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} Listening on PORT: ${PORT}`));