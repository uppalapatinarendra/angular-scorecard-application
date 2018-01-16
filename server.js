const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

Player =require('./models/player');

// Connect to Mongoose
//mongoose.connect('mongodb://localhost/players');

mongoose.connect('mongodb://narendra:narendra@ds161146.mlab.com:61146/information');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/players');
});


app.get('/api/players', (req, res) => {
	Player.getPlayers((err, players) => {
		if(err){
			throw err;
		}
		res.json(players);
	});
});

app.get('/api/players/:_id', (req, res) => {
	Player.getPlayerById(req.params._id, (err, player) => {
		if(err){
			throw err;
		}
		res.json(player);
	});
});

app.post('/api/players', (req, res) => {
	var player = req.body;
	Player.addPlayer(player, (err, player) => {
		if(err){
			throw err;
		}
		res.json(player);
	});
});

app.put('/api/players/:_id', (req, res) => {
	var id = req.params._id;
	var player = req.body;
	Player.updatePlayer(id, player, {}, (err, player) => {
		if(err){
			throw err;
		}
		res.json(player);
	});
});

app.delete('/api/players/:_id', (req, res) => {
	var id = req.params._id;
	Player.removePlayer(id, (err, player) => {
		if(err){
			throw err;
		}
		res.json(player);
	});
});

app.listen(process.env.PORT || 5000, function() {
    console.log("Server started.......");
});
