var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

Game = require('./models/game');

var app=express();

app.use(bodyParser.json());

// Connecting to mongoose

mongoose.connect('mongodb://localhost/gamestore');
var db= mongoose.connection;

app.get('/',function(req,res){
    res.send("Use /api/games");
});

// Getting all games from db

app.get('/api/games',function(req,res){
    Game.getGames(function(err, games){
        if(err){throw err;}
        res.json(games);
    });
});

// Getting single game by id from db

app.get('/api/games/:_id',function(req,res){
    Game.getGameById(req.params._id, function(err, game){
        if(err){throw err;}
        res.json(game);
    });
});

//adding a new game

app.post('/api/games',function(req,res){
    var game = req.body;
    Game.addGame(game, function(err, game){
        if(err){throw err;}
        res.json(game);
    });
});

//updating a game

app.put('/api/games/:_id',function(req,res){
    var id = req.params._id;
    var game = req.body;
    Game.updateGame(id, game, {}, function(err, game){
        if(err){throw err;}
        res.json(game);
    });
});

//deleting a game

app.delete('/api/games/:_id',function(req,res){
    var id = req.params._id;
    Game.removeGame(id, function(err, game){
        if(err){throw err;}
        res.json(game);
    });
});

//assigning a port

app.listen(9001);
console.log('Running ay 9001');