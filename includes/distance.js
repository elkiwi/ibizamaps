// JavaScript Document


//
// Various functions for creating a pedometer using Google Maps.
//
// You use this software at your own risk. It shouldn't be used to run
// nuclear power stations or fly aeroplanes.
//
// Written by Simon Buckle (simon@simonbuckle.com) 
//
// Copyright 2005
//



//-------------------------------------------------------------------------------------------------
//  VARIABLES / OBJECTS
//-------------------------------------------------------------------------------------------------
var map;
var routePoints = new Array(0);
var total_distance = 0;
var unit_handler;

var KMS = {
	label: "km",
	f : function (distance) {
			return distance / 1000;
	}
}

var MILES = {
	label : "miles",
	f : function (distance) {
			return distance / 1609.344;
	}
}



var Codec = {
	encodePoints : function (locations) {
		var points = [];
		var x0 = 0;
		var y0 = 0;

		locations = this.map(function (x) { return Math.round(x / 1.0E-5); }, locations);

		for (var i = 0; i < locations.length / 2; i++) {
			var y = locations[i << 1];
			var dy = y - y0;
			y0 = y;
			var f = (Math.abs(dy) << 1) - (dy < 0);
			while (1) {
				var e = f & 31;
				f >>= 5;
				if (f) 
					e |= 32;
				points.push(String.fromCharCode(e + 63));
				if (f == 0)
					break;
			}
			var x = locations[(i << 1) + 1]
			var dx = x - x0;
			x0 = x;
			f = (Math.abs(dx) << 1) - (dx < 0);
			while (1) {
				var e = f & 31;
				f >>= 5;
				if (f) 
					e |= 32;
				points.push(String.fromCharCode(e + 63));
				if (f == 0)
					break;
			}
		}
		return points.join("");
	},

	decodePoints : function (points) {
		if (!points) 
			return [];
	
		var locations = [];
    	var pb = 0;
		var Ka = 0;
		var Pa = 0;

		while (pb < points.length) {
			var oc = 0;
			var Fa = 0;
			while (1) {
				var ub = points.charCodeAt(pb) - 63;
				pb += 1;
				Fa |= (ub & 31) << oc;
				oc += 5;
				if (ub < 32) 
					break;
			}
			var i;
			if (Fa & 1) 
				i = ~(Fa >> 1);
			else
				i = Fa >> 1;
			Ka += i;
			locations.push(Ka * 1.0E-5);

			oc = 0;
			Fa = 0;
			while (1) {
				var ub = points.charCodeAt(pb) - 63;
				pb += 1;
				Fa |= (ub & 31) << oc;
				oc += 5;
				if (ub < 32) 
					break;
			}
			if (Fa & 1) 
				i = ~(Fa >> 1);
			else
				i = Fa >> 1;
			Pa += i;
			locations.push(Pa * 1.0E-5); 
		}
		return locations;
	},

	map : function (f, a) {
		var results = [];
		for(var i = 0; i < a.length; i++) {
			results[i] = f(a[i]);
		}
		return results;
	}
}




//-------------------------------------------------------------------------------------------------
//  MAP INITIALIZATION / LOAD FUNCTIONS
//-------------------------------------------------------------------------------------------------
function loadGMap() {
    //initialize the unit handler
    unit_handler = KMS;
    
    //initialize map
    map = new GMap(document.getElementById("map"));
    
    //add whatever controls we want to the map
    map.addControl(new GLargeMapControl());
    map.addControl(new GMapTypeControl());

    //add the terrain layer
    map.addMapType(G_PHYSICAL_MAP);
    
    var url = window.location.href.split("?");
    if (url[1]) {
	    initialiseMapFromURL(window.location.href);
    } else {
	    // Use the default
	    map.centerAndZoom(new GPoint(1.398375, 38.961929), 6);
    }


    GEvent.addListener(map, "click", function(overlay, point) {
    if (point) {
	    map.clearOverlays();
	    routePoints.push(point);  
	    map.addOverlay(new GPolyline(routePoints));
	    
	    // Add a marker at the beginning and the end
	    map.addOverlay(new GMarker(routePoints[0]));
	    if ( routePoints.length > 1 ) {
		    map.addOverlay(new GMarker(routePoints[routePoints.length - 1]));
		    
		    // Re-calculate the distance so far
		    var lastLeg = distance_between_points(routePoints[routePoints.length - 2], routePoints[routePoints.length - 1]);
		    total_distance += lastLeg;	
		    updateDisplay();			
	    }
    }
    });
}


function initialiseMapFromURL(url) {
	var url = url.split("?");

	if (!url[1]) {
		return null;
	}

	var params = new Object();
	var queryStr = url[1].split("&");
	var pattern = /(\w+)=(.+)/;
	var result;

	for (var i = 0; i < queryStr.length; i++) {
		if ((result = pattern.exec(queryStr[i])) != null) {
			var param = result[1];
			params[param] = decodeURI(result[2]);
		}
	}

	map.centerAndZoom(new GPoint(params.x, params.y), parseFloat(params.zl));
	
	if (params.path) {
		var path = Codec.decodePoints(params.path);
		for (var i = 0; i < path.length / 2; i++) {
			routePoints.push(new GPoint(path[2*i + 1], path[2*i]));
		}
		map.addOverlay(new GPolyline(routePoints));
		// Add the start/end markers
		map.addOverlay(new GMarker(routePoints[0]));
		map.addOverlay(new GMarker(routePoints[routePoints.length - 1]));
		// Calculate the length of the route
		total_distance = calculateDistance(routePoints);
	}

	updateDisplay();
}




//-------------------------------------------------------------------------------------------------
//  CALCULATION FUNCTIONS
//-------------------------------------------------------------------------------------------------

// Utility function for converting degrees to radians
Math.deg2rad = function ( x ) {
    return x * (Math.PI / 180.0); 
}


// Takes an array of points and works out the total distance
function calculateDistance (points) {
	if (points.length < 2)	
		return 0;

	var dist = 0.0;

	for (var i = 0; i < points.length - 1; i++) {
		dist += distance_between_points(points[i], points[i + 1]);		
	}

	return dist;
}

function calculateTaxiDay (points) {
	if (points.length < 2)	
		return 0;

	var dist = 0.0;
	var price = 0;

	for (var i = 0; i < points.length - 1; i++) {
		price = dist += distance_between_points(points[i], points[i + 1]) * .98;		
	}

	return price;
}




// Calculates the distance (in metres) between 2 points. 
function distance_between_points ( p1, p2 ) {
    // Distance in metres
    var EARTH_RADIUS = 6367000;

    var a = Math.deg2rad( 90 - p1.y);
    var b = Math.deg2rad( 90 - p2.y);
    var theta = Math.deg2rad( p2.x - p1.x);
    var c = Math.acos( Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(theta));

    return c * EARTH_RADIUS; 
}




//-------------------------------------------------------------------------------------------------
//  USER INTERFACE FUNCTIONS
//-------------------------------------------------------------------------------------------------

// Clear the last leg
function clearLastLeg ( ) {
	if (routePoints.length < 2)
		return;
	routePoints.pop();
	map.clearOverlays();

	// Re-draw
	map.addOverlay(new GPolyline(routePoints));

	// Add the start/end markers
	map.addOverlay(new GMarker(routePoints[0]));
	map.addOverlay(new GMarker(routePoints[routePoints.length - 1]));	
	
	// Re-calculate the total distance
	total_distance = calculateDistance(routePoints);
	updateDisplay();
}


// Clears the existing route
function clearRoute ( ) {
	routePoints = [];
	map.clearOverlays();
	total_distance = 0.00;
	// Refresh the distance field
	updateDisplay();
}


function generateURL ( ) {
	var url = generatePermalink();
	// Reload the document
	window.location = url;	
}


function generateTinyURL ( ) {
	document.getElementById("TinyURL").value = generatePermalink();
	document.tinyURLform.submit();
}


function updateDisplay () {
	var dist = unit_handler.f(total_distance);
	document.getElementById("distance").value = dist.toFixed(3);
	
	var priceday = (unit_handler.f(total_distance) * .98) + 3.25;
	document.getElementById("priceday").innerHTML = priceday.toFixed(2) + "&euro;";
	
	var pricenight = (unit_handler.f(total_distance) * 1.20) + 3.25;
	document.getElementById("pricenight").innerHTML = pricenight.toFixed(2) + "&euro;";
	
	// Set the label
	document.getElementById("units").innerHTML = unit_handler.label;
} 


function toggleUnits (arg) {
	if (arg == "MILES") 
		unit_handler = MILES;
	else if (arg == "KMS")
		unit_handler = KMS;
	else
		// Revert to the default
		unit_handler = KMS;
	// Refresh
	updateDisplay();
}


// Generates a unique URL for this route
function generatePermalink ( ) {
	var params = [];
	// grab whatever the existing URL is
	var url = window.location.href.split("?")[0];

	var zl = map.getZoomLevel();
	params.push("zl=" + zl);

	var center = map.getCenterLatLng();
	params.push("x=" + center.x);
	params.push("y=" + center.y);
	
	var location = [];
	var pt;

	for (var i = 0; i < routePoints.length; i++) {
		pt = routePoints[i];
		location.push(pt.y);
		location.push(pt.x);
	}
	
	params.push("path=" + Codec.encodePoints(location));
	
	url += "?"; 
	url += params.join("&");	

	return url;
}


