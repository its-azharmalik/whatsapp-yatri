const mongoose = require('mongoose');
const colors = require('colors');

const username = 'azharmalik';
const password = 'azhar';
const cluster = 'chintukepapa.8pqjt6k';
const dbname = 'yatri';

// mongodb+srv://azharmalik:azhar@chintukepapa.8pqjt6k.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(
	`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
	console.log(`Database Connected successfully`.bold.blue);
});

module.exports = db;
