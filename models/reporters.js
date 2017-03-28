var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reporterSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	registeredDevices : [{
		name : { type : String},
		devices : [ { type : String, unique : true } ]
	}],
	discoveryList : [{
		device : { type : String },
		time : { type : Date}
	}]
});

reporterSchema.statics.get_reporter_info=function(reporterId,callback){
	var r = {msg:[],status:0};
	var query = {
		id:reporterId
	};
	var options = {};
	
	console.log("reporterSchema");
	
	this.model('reporters').findOne(query,options)
		.exec(function(err,result){
			if (err){
				console.log("--reporterSchema - an error occured: ", err);
				r.msg.push("--reporterSchema - an error occured: ",err);
				
				return callback(r);
			}

			if (!result || typeof(result) !== 'object' || !result.discoveryInfo){
				
				console.log("--reporterSchema - reporter wan't found. id: ", reporterId);		
				r.msg.push("--reporterSchema - reporter wan't found. id: ", reporterId);
				r.status = 0;
				
				return callback(r);
			}
			
			console.log("--reporterSchema - reporter found. id: ", reporterId);
			r.msg.push("--reporterSchema - reporter found. id: ", reporterId);
			r.status=1;
			r.info=result.registeredDevices;
			return callback(r);
		});
}

//TODO. update collection name
Reporter = mongoose.model('reporters', reporterSchema);