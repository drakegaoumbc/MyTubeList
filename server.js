var express = require('express');
var path = require('path');
var cors = require('cors');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var videoServiceController = require('./routes/service_ctrl');

var app = express();
const PORT = 3000;

//middleware
mongoose.connect('mongodb://localhost:27017/mytubelist', {useMongoClient: true});
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

//app.use(cors()); 
// for cross orgin or same host
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.post('/savevideo', videoServiceController.create);
app.get('/getvideos/:username', videoServiceController.getVideos);
app.get('/getvideo/:videoid/:username', videoServiceController.findOne);
app.post('/delvideo/:videoid/:username', videoServiceController.delVideo);

app.listen(PORT, function() {
	console.log('listening on port 3000');
});