var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reporterSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	discoveryInfo: [{
		name : { type : String},
		devices : [
			{ type : String, unique : true }
			]
	}]
});

reporterSchema.statics.get_reporter_info=function(reporterId,callback){
	var r = {msg:[],status:0};
	var query = {
		id:reporterId
	};
	var options = {};
	
	console.log("reporterSchema");
	
	this.model('entries').findOne(query,options)
		.exec(function(err,result){
			if (err){
				console.log("--reporterSchema - an error occured: ", err);
				r.msg.push("--reporterSchema - an error occured: ",err);
				
				return callback(r);
			}

			console.log("--reporterSchema - reporter found. id: ", reporterId);
			r.msg.push("--reporterSchema - reporter found. id: ", reporterId);
			r.status=1;
			r.info=result;
			return callback(r);
		});
}

//TODO. update collection name
Reporter = mongoose.model('entries', reporterSchema);