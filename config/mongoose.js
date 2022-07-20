//Setting up mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.db_name||'mongodb://localhost/codeial_development');

//Fetching the connection
const db = mongoose.connection;

//Checking if any error occured in connecting.
db.on('error', console.error.bind(console, 'Error Connecting to MongoDB'));

//Check if connection is opened
db.once('open', function(){
		console.log('Connected to Database :: MongoDB');
});

//Export the connection
module.exports = db;