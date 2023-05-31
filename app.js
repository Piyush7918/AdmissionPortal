const express = require('express')
const connectDB = require('./db/connect_db')
const web = require('./routes/web')
//cookies 
const cookieParser = require('cookie-parser')


const app = express()
const port = 3000
var session = require('express-session')
var flash = require('connect-flash');
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
const fileUpload = require("express-fileupload");
//Temp file uploader
app.use(fileUpload({useTempFiles: true}));

//conect_db
connectDB()

//for flash massage show
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized:false,
}));

app.use(flash());

app.set('view engine', 'ejs')

//route localhost:300
app.use('/',web)

//static files
app.use(express.static('public'))




//server create
app.listen(port, () => {
    console.log('server start local server:3000')
  })