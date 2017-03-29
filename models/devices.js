var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	name : { type : String},
	location : { type : String},
	time : { type : String},
	strengh : { type : String},
	receiveTime : { type : String }
});

deviceSchema.statics.set_devices_last_location=function(reporterId,deviceReports,callback){
	var r = {msg:[],status:0};
	
	console.log("--deviceSchema");
	
	for(var i = 0; i < deviceReports.length; ++i) {
		var report = deviceReports[i];
		console.log("--deviceSchema - report: ", report);
		
		var currentTime = new Date();
		
		var currentStrengh = Number(report.Rssi);
		console.log("--deviceSchema - current strength: ", currentStrengh);
	
		var query = {
			id:report.Address	
		};
		var options = {};
		
		Device.findOne(query,options)
			.exec(function(err,result) {
			
			if (err) {
				console.log("--deviceSchema - should_update_location_according_timeframe, err: ", err);
				console.log("error: ", err);
				
				r.msg.push("--deviceSchema - should_update_location_according_timeframe, err: ", err);
				r.msg.push("error: ", err);
			}
			
			if (!result || typeof(result) !== 'object'){		
				console.log("--deviceSchema - should_update_location_according_timeframe - devices were not found");		
				r.msg.push("--deviceSchema - should_update_location_according_timeframe - devices were not found");
			} 
			else {			
				var receivedTimeInSeconds = (((new Date(result.receiveTime)).getTime())/1000);
				var currentTimeInSeconds = (currentTime/1000);
				console.log("--deviceSchema - received time in seconds: ", receivedTimeInSeconds);
				console.log("--deviceSchema - current time in seconds: ", currentTimeInSeconds);
				console.log("--deviceSchema - difference in time: ", currentTimeInSeconds - receivedTimeInSeconds);
				
				if (currentTimeInSeconds - receivedTimeInSeconds  > 60 && currentStrengh > Number(result.strengh)) {				

					console.log("--deviceSchema - **UPDATE**");
					options = {
						upsert:true
					};
					
					var device = {
						id:report.Address,
						location:reporterId,
						time:report.DiscoveryTime,
						strengh:currentStrengh,
						receiveTime:currentTime
					};
					console.log("--deviceSchema - device : ", device);
					
					this.model('devices').findOneAndUpdate(query,{$set:device},options)
						.exec(function(err,result) {
							if (err) {
							console.log("--deviceSchema - device lication was not updated. id: ", report.Address);
							console.log("error: ", err);
							
							r.msg.push("--deviceSchema - device lication was not updated. id: ", report.Address);
							r.msg.push("error: ", err);
						}
					});
				} else {
					console.log("--deviceSchema - **DONT UPDATE**");
				}
			}
		});
	}
	
	console.log("--deviceSchema - devices upcation was updated");
	r.msg.push("--deviceSchema - devices upcation was updated");
	r.status=1;
	return callback(r);
}

function should_update_location_according_timeframe(report, currentStrengh, currentTime) {
	var result = false; 
	//get last report time
	var query = {
		id:report.Address	
	};
	var options = {
	};
	
	console.log("--deviceSchema - should_update_location_according_timeframe");
	
	Device.findOne(query,options)
		.exec(function(err,result) {
			if (err) {
				console.log("--deviceSchema - should_update_location_according_timeframe, err: ", err);
				console.log("error: ", err);
				
				r.msg.push("--deviceSchema - should_update_location_according_timeframe, err: ", err);
				r.msg.push("error: ", err);
			}
			
			if (!result || typeof(result) !== 'object'){		
				console.log("--deviceSchema - should_update_location_according_timeframe - devices were not found");		
				r.msg.push("--deviceSchema - should_update_location_according_timeframe - devices were not found");
			} 
			else {			
				console.log("--deviceSchema - should_update_location_according_timeframe - current time: ", currentTime);
				console.log("--deviceSchema - should_update_location_according_timeframe - last receive time: ", new Date(result.receiveTime));
				console.log("--deviceSchema - should_update_location_according_timeframe - current strengh: ", currentStrengh);
				console.log("--deviceSchema - should_update_location_according_timeframe - last strength: ", result.strengh);
				console.log("--deviceSchema -----------------------");
				var receivedTimeInSeconds = (((new Date(result.receiveTime)).getTime())/1000);
				var currentTimeInSeconds = (currentTime/1000);
				console.log("--deviceSchema - should_update_location_according_timeframe - received time in seconds: ", receivedTimeInSeconds);
				console.log("--deviceSchema - should_update_location_according_timeframe - current time in seconds: ", currentTimeInSeconds);
				console.log("--deviceSchema - difference in time: ", currentTimeInSeconds - receivedTimeInSeconds);
				console.log("--deviceSchema -----------------------");
				
				if (currentTimeInSeconds - receivedTimeInSeconds  > 60 && currentStrengh > Number(result.strengh)) {
					console.log("--deviceSchema - should_update_location_according_timeframe - RETURN TRUE");
					result = true;
				}
			}
		});
	
	console.log("--deviceSchema - should_update_location_according_timeframe - result", result);	
	return result;
}

function should_update_location_according_strength(report) {
	var maxStrengh = -60;
	
	var strengh = Number(report.Rssi);
	console.log("--deviceSchema - strengh: ", strengh);
	
	if (strengh > maxStrengh) {
		console.log("--deviceSchema - the signal is strong enought");
		return true;
	}
	
	return false;
}

deviceSchema.statics.get_devices_last_location=function(callback){
	var r = {msg:[],status:0};
	var query = {};
	var options = {
		_id : 0
	};
	
	this.model('devices').find(query,options)
		.exec(function(err,result) {
			if (err) {
				console.log("--deviceSchema - devices lication were not found.");
				console.log("error: ", err);
				
				r.msg.push("--deviceSchema - devices lication were not found.");
				r.msg.push("error: ", err);
			}
			
			if (!result || typeof(result) !== 'object'){
				
				console.log("--deviceSchema - devices were not found");		
				r.msg.push("--deviceSchema - devices were not found");
				r.status = 0;
				
				return callback(r);
			}
			
			console.log("--deviceSchema - devices location were found");
			r.msg.push("--deviceSchema - devices location were found");
			r.status=1;
			r.info = result;
			return callback(r);
	});
}



Device = mongoose.model('devices', deviceSchema);