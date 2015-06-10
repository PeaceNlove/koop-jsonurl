// Defines the routes and params name that will be passed in req.params 
// routes tell Koop what controller method should handle what request route

module.exports = {
  // route : handler
  'post /jsonurl': 'register',
  'get /jsonurl': 'index',
  'get /jsonurl/:id/:file/FeatureServer': 'featureserver',
  'get /jsonurl/:id/:file/FeatureServer/:layer': 'featureserver',
  'get /jsonurl/:id/:file/FeatureServer/:layer/:method': 'featureserver',
  
}
