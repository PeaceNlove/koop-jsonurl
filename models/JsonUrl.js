var request = require('request');

var JsonUrl = function( koop ){

  var jsonUrl = {};
  jsonUrl.__proto__ = koop.BaseModel( koop );
  
  // adds a service to the Cache.db
  // needs a host, generates an id 
  jsonUrl.register = function (id, host, callback) {
    var type = 'jsonUrl:url';
	debugger;
    koop.Cache.db.serviceCount( type, function (error, count) {
      id = id || count++;
      koop.Cache.db.serviceRegister( type, {'id': id, 'host': host},  function (err, success) {
        callback( err, id );
      });
    });
  };
  // get service by id, no id == return all
  jsonUrl.find = function( id, file, options,callback ){
	  var options = options;
    koop.Cache.db.serviceGet( 'jsonUrl:url', parseInt(id) || id, function(err, res){
		
      if (err){
        callback('No service table found for that id. Try POSTing {"id":"arcgis", "host":"http://www.arcgis.com"} to /jsonurl', null);
      } else {
        var type = 'JsonUrl';
		var dbId = id+":"+file;
		var host = res.host;
		// check the cache for data with this type & id 
		koop.Cache.get( type, dbId, options, function(err, entry ){
			
		  if ( err){
			// if we get an err then get the data and insert it 
			var url = host + file; // <-- change this to point to a real URL
	  
			request.get(url, function(e, res){
			  var json = JSON.parse(res.body);
			  
	  
			  // insert data into the cache; assume layer is 0 unless there are many layers (most cases 0 is fine)  
			  koop.Cache.insert( type, dbId, json, 0, function( err, success){
				if ( success ) {
				  callback( null, json );
				}
			  });
			});
		  } else {
			callback( null, entry );
		  }
		});
      }
    });
  };

  
  
  return jsonUrl;

};

module.exports = JsonUrl;
