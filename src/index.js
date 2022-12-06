const express = require('express');
const session = require('express-session')
const MYSQLStore = require('express-mysql-session')
const passport = require('passport')


const {database} = require('./keys')

//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 3000)

//midlewars
app.use(session({
    secret: "AKjsnasi",
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global variables 
app.use((req,res,next)=>{
    app.locals.user = req.user;
    next();
});
//Routes
app.use(require('./routes/prueba'));
//Public

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});