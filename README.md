# koop-jsonurl provider 

## A provider for serving geojson files as FeatureService 


------------

This provider exposes geojson files available via http as FeatureService. This makes it possible to consume these files via Koop in Arcgis Online

For example:
http://www.opengis.eu/geoservice/bevingen.json

1: Register the url http://www.opengis.eu/geoservice/ with jsonurl by posting 
{"id":"earthquake","host":"http://www.opengis.eu/geoservice/"} to http://localhost:1337/jsonurl

2: Open the Featureservice using this url
http://localhost:1337/jsonurl/earthquake/bevingen.json/Featureserver/0

