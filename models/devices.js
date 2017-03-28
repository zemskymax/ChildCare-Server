var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	name : { type : String},
	location : { type : String},
	time : { type : String}
});

deviceSchema.statics.set_devices_last_location=function(reporterId,deviceReports,callback){
	var r = {msg:[],status:0};
	var maxStrengh = 60;
	
	console.log("--deviceSchema");
	
	for(var i = 0; i < deviceReports.length; ++i) {
		var report = deviceReports[i];
		console.log("--deviceSchema - report: ", report);
		
		var strengh = Number(report.Rssi);
		console.log("--deviceSchema - strengh: ", strengh);
		
		if (strengh < maxStrengh) {
			console.log("--deviceSchema - the signal is strong enought");
			var query = {
				id:report.Address	
			};
			var options = {
				upsert:true
			};
			
			var device = {
				id:report.Address,
				location:reporterId,
				time:report.DiscoveryTime
			};
			console.log("--deviceSchema - device : ", device);
			
			this.model('users').findOneAndUpdate(query,{$set:device},options)
				.exec(function(err,result) {
					if (err) {
					console.log("--deviceSchema - device lication was not updated. id: ", report.Address);
					console.log("error: ", err);
					
					r.msg.push("--deviceSchema - device lication was not updated. id: ", report.Address);
					r.msg.push("error: ", err);
				}
			});
		}
	}
	
	console.log("--deviceSchema - devices upcation was updated");
	r.msg.push("--deviceSchema - devices upcation was updated");
	r.status=1;
	return callback(r);
}

Device = mongoose.model('devices', deviceSchema);