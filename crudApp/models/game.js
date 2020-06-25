var mongoose = require('mongoose');

// Game Schema

var gameSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    release_year:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    }
});

var Game = module.exports = mongoose.model('Game' , gameSchema);

//get games

module.exports.getGames = function(callback, limit){
    Game.find(callback).limit(limit);
}

//get game by id

module.exports.getGameById = function(id, callback){
    Game.findById(id, callback);
}

//adding a game

module.exports.addGame = function(game, callback){
    Game.create(game, callback);
}

//updating a game

module.exports.updateGame = function(id , game, options, callback){
    var query = {_id : id};
    var update ={
        name : game.name,
        release_year : game.release_year,
        rating : game.rating
    }
    Game.findOneAndUpdate(query, update, options, callback);
}


// deleting a game

module.exports.removeGame = function(id, callback){
    var query = {_id : id};
    Game.remove(query, callback);
}