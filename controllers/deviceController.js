/**
 * receives device report
 * @param req
 * @param res
 */
exports.get_devices_last_location = function(req,res,next){
	var r = {msg:[],status:0};
	
	console.log("get_devices_last_location");
	
	//TODO. Do something in the db
    r.msg.push('we are ok');
	r.info = {"info" : [
					{"id" : "mac1", "name" : "Raz", "location" : "reporter1", "time" : "1"},
					{"id" : "mac2", "name" : "Max", "location" : "reporter2", "time" : "2"},
					{"id" : "mac4", "name" : "Rony", "location" : "reporter3", "time" : "2"},
					{"id" : "mac3", "name" : "Meir", "location" : "reporter4", "time" : "2"}
					]};
	r.status = 1;
	return res.json(r);
}

