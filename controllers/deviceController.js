/**
 * receives device report
 * @param req
 * @param res
 */
exports.get_devices_last_location = function(req,res,next){
	var r = {msg:[],status:0};
	
	console.log("get_devices_last_location");
	
	Device.get_devices_last_location(function(result){
		if (!result.status){
			
			console.log("get_devices_last_location - couldn't find devices location");
			r.msg.push("get_devices_last_location - couldn't find devices location");
			
			return res.json(r);
		}

		return res.json(result)
	});
}

