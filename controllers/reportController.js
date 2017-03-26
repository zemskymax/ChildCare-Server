/**
 * receives device report
 * @param req
 * @param res
 */
exports.set_devices_discovery_report = function(req,res,next){
	var r = {msg:[],status:0};
	var reporter = req.body.reporter;
	var discoveryInfo = req.body.discoveryInfo;
	
	console.log("get_devices_discovery_report - reporter: ", reporter);
	
	if (!reporter || typeof(reporter) !== 'object' || !reporter.id || !discoveryInfo){
		
		r.msg.push('please provide all the required data', reporter);
		return res.json(r);
	}

	console.log("get_devices_discovery_report - reporter id: ", reporter.id);
	console.log("get_devices_discovery_report - discovery info: " , discoveryInfo);
	
	//TODO. Do something in the db
    r.msg.push('we are ok');
	r.status = 1;
	return res.json(r);
}

/**
 * retrives device information
 * @param req
 * @param res
 */
exports.get_reporter_info = function(req,res,next){
	var r = {msg:[],status:0};
	var reporter = req.body.reporter;

	console.log("get_reporter_info - reporter: ", reporter);
	
	if (!reporter || typeof(reporter) !== 'object' || !reporter.id){
		
		r.msg.push('please provide the required data', reporter);
		return res.json(r);
	}

	console.log("get_reporter_info - reporter id: ", reporter.id);
	
	//TODO. Do something in the db
	return res.json({"info" : [
						{"name" : "a1", "devices" : ["1","2","3"]},
						{"name" : "a2", "devices" : ["4"]},
						{"name" : "a3", "devices" : ["5","6"]}
	]});
}