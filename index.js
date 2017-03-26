var express = require('express');
var app = express();
var http = require('http').Server(app);

var bodyParser  = require('body-parser');
var fs = require("fs-extra");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));

//headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, uid");
  next();
});

app.locals.name = 'ChildCare';

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//load controllers
var controllers = { }, controllers_path = process.cwd() + '/controllers';
console.log("loading controllers")

fs.readdirSync(controllers_path).forEach(function (file) 
{
    if (file.indexOf('.js') != -1) 
    {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
        console.log(file);
    }
});

//exception handler
process.on("uncaughtException", function(err) 
{
	console.log({data:'uncaughtException', error: err.stack}); 
});

var env = process.env.NODE_ENV || 'development';

//server
http.listen(app.get('port'), function() 
{
  console.log(app.locals.name+' server running...');
  console.log('Port: '+ app.get('port'));
  console.log('Mode: ' + env );
  console.log(new Date());
});

//report
app.post('/report/setDevicesDiscoveryReport', controllers.reportController.set_devices_discovery_report); 
app.post('/report/getReporterInfo', controllers.reportController.get_reporter_info); 

//default
app.get('/*', function(req, res) 
{
    console.log({data:'page not found', url: req.url});
    res.json({msg:['page not allowed '+app.locals.name]});
})




