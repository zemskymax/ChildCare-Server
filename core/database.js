var mongoose = require('mongoose')
    , fs = require('fs')
    , models_path = process.cwd() + '/models';

//load models
console.log("loading models");
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file);
		console.log("->",file);
	}
});

console.log("mongo url: ", config.db.mongoUrl);
console.log("mongo options: ", config.db.options);

mongoose.connect(config.db.mongoUrl, config.db.options);

var db = mongoose.connection;

db.on('error', function (err) {
    console.error('Mongo connection error:', err);
});

db.once('open', function callback() {
    console.info('Mongo connection is established');
});

db.on('disconnected', function() {
    console.error('Mongo disconnected!');
    mongoose.connect(config.db.mongoUrl, config.db.options);
});

db.on('reconnected', function () {
    console.info('Mongo reconnected!');
});
