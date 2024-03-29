const express = require('express');
const app= express();
const port = process.env.PORT||8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);


//Marking assets folder as the folder holding static files.
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
const { urlencoded } = require('express');

//to parse post request
app.use(express.urlencoded());



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views'); 

//mongo store is used to store the session cookie in the db 
app.use(session({
    //name of cookie
    name: 'codeial',
    //Todo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));




app.listen(port, function(err){
	if(err){
		console.log(`Error in running the server: ${err}`);
		return;
	}

	console.log(`Server is running on port: ${port}`);
});