var express = require('express');
var router = express.Router();
var Mylist = require('../models/list_model');

module.exports.create = function(req, res) {
	// mongoose will take Mylist as plural mylists collectioin in database
	var mylist = new Mylist(req.body);
	mylist.save(function(err, results) {
		if(err)
			console.log(err);
		else
			return res.json(results);
	});
}

module.exports.getVideos = function(req, res) {
	Mylist.find({userName: req.params.username}, function(err, results) {
		if(err) {
			res.send(err);
		}
		res.json(results);
	});
}

module.exports.findOne = function(req, res) {
	console.log("video id is" + req.params.videoid + " " + req.params.username);
	Mylist.find({_id: req.params.videoid, userName: req.params.username}, function(err, found) {
		if(err) {
			return res.json(err);
		} 
		res.json(found);
	});
	
}

module.exports.delVideo = function(req, res) {
	console.log("videoid is " + req.params.username + " is about to be deleted");
	//Mylist.findByIdAndRemove(req.params.videoid, function(err, removed) {
	Mylist.remove({_id: req.params.videoid, userName: req.params.username}, function(err, removed) {
		if(err) {
			return res.json(err);
		} 

		res.json("good");
	});
}
//module.exports = router;

/*var query  = Mylist.where({_id: req.params.videoid}); // <-- Use the correct param name
    query.findOne(function (err, Mylist) {
        if (err)
            return res.send(err)
        res.json(Mylist);
        });
    };*/