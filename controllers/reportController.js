/**
 * receives device report
 * @param req
 * @param res
 */
exports.set_devices_discovery_report = function(req,res,next){
	var r = {msg:[],status:0};
	var reporterId = req.body.reporterId;
	var deviceReports = req.body.DeviceReports;
	
	console.log("set_devices_discovery_report");
	
	if (!reporterId || typeof(reporterId) !== 'object' || !reporterId || 
		!deviceReports || typeof(deviceReports) !== 'object' || !deviceReports){
		
		r.msg.push('set_devices_discovery_report - please provide all the required data');
		r.msg.push('set_devices_discovery_report - reporter id: ', reporterId);
		r.msg.push('set_devices_discovery_report - device reports: ', deviceReports);
		return res.json(r);
	}

	console.log("set_devices_discovery_report - reporter id: ", reporterId);
	console.log("set_devices_discovery_report - device reports: " , deviceReports);
	
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
		
		r.msg.push('please provide all the required data', reporter);
		return res.json(r);
	}

	console.log("get_reporter_info - reporter id: ", reporter.id);
	
	Reporter.get_reporter_info(reporter.id,function(result){
		if (!result.status){
			
			console.log('get_reporter_info - reporter was not found: ', reporter.id);
			r.msg.push('get_reporter_info - reporter was not found: ', reporter.id);
			
			return res.json(r);
		}

		return res.json(result)
	});
}