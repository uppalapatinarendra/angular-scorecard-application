const mongoose = require('mongoose');


const playerSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	amount:{
		type: Number,
		required: true
	},
    score:{
        type: Number
    },
    wickets: {
        type: Number
    },
    catches: {
        type: Number
    },
	image_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Player = module.exports = mongoose.model('Player', playerSchema);


module.exports.getPlayers = (callback, limit) => {
	Player.find(callback).limit(limit);
}


module.exports.getPlayerById = (id, callback) => {
	Player.findById(id, callback);
}


module.exports.addPlayer = (player, callback) => {
	Player.create(player, callback);
}


module.exports.updatePlayer = (id, player, options, callback) => {
	var query = {_id: id};
	var update = {
		name: player.name,
		description: player.description,
		amount: player.amount,
        score: player.score,
		image_url: player.image_url
	}
	Player.findOneAndUpdate(query, update, options, callback);
}


module.exports.removePlayer = (id, callback) => {
	var query = {_id: id};
	Player.remove(query, callback);
}
