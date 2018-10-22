  //<![CDATA[
	  
	  	function initialize() {
			
			var customIcons = {
			  
			  1: {
				icon: '/images/markers/hotels.png'
			  },
			  2: {
				icon: '/images/markers/hotels.png'
			  },
			  3: {
				icon: '/images/markers/hotels.png'
			  },
			  4: {
				icon: '/images/markers/hotels.png'
			  },
			  5: {
				icon: '/images/markers/hotels.png'
			  },
			  6: {
				icon: '/images/markers/hotels.png'
			  },
			  7: {
				icon: '/images/markers/business.png'
			  },
			  8: {
				icon: '/images/markers/business.png'
			  },
			  9: {
				icon: '/images/markers/shops.png'
			  },
			  10: {
				icon: '/images/markers/government.png'
			  },
			  11: {
				icon: '/images/markers/information.png'
			  },
			  12: {
				icon: '/images/markers/activities.png'
			  },
			  13: {
				icon: '/images/markers/point-of-interest.png'
			  },
			  14: {
				icon: "/images/markers/beach.png"
			  },
			  15: {
				icon: '/images/markers/bars.png'
			  },
			  16: {
				icon: '/images/markers/restaurants.png'
			  },
			  17: {
				icon: '/images/markers/beachbars.png'
			  },
			  18: {
				icon: '/images/markers/transport.png'
			  },
			  19: {
				icon: '/images/markers/club.png'
			  },
			  20: {
				icon: '/images/markers/point-of-interest.png'
			  },
			  21: {
				icon: '/images/markers/cafe.png'
			  },
			  22: {
				icon: '/images/markers/point-of-interest.png'
			  },
			  23: {
				icon: '/images/markers/hotels.png'
			  },
			  24: {
				icon: '/images/markers/petrol.png'
			  },
			  25: {
				icon: '/images/markers/supermarkets.png'
			  },
			  26: {
				icon: '/images/markers/property.png'
			  },
			  27: {
				icon: '/images/markers/property.png'
			  },
			  28: {
				icon: '/images/markers/charters.png'
			  }
			  
			};
		
								markerLatLng = new google.maps.LatLng(latitude, longitude);
								directionsDisplay = new google.maps.DirectionsRenderer();
		
		
		
        var mapOptions = {
          center :markerLatLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		
		
		
		

		
        

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		 directionsDisplay.setMap(map);
			
			map.setOptions({styles: [


   {
     featureType: "poi.business",
     elementType: "labels",
     stylers: [
       { visibility: "off" }
     ]
   }
 ]});
		
		var infoWindow = new google.maps.InfoWindow;
		var center = markerLatLng;
		
		
		
		var draw_circle = null;  // object of google maps polygon for redrawing the circle
		 
			function DrawCircle(rad) {
		 
			rad *= 1600; // convert to meters if in miles
			if (draw_circle != null) {
				draw_circle.setMap(null);
			}
			draw_circle = new google.maps.Circle({
				center: center,
				radius: rad,
				strokeColor: "#FF0000",
				strokeOpacity: 0.5,
				strokeWeight: 1,
				fillColor: "#FF0000",
				fillOpacity: 0.35,
				map: map
			});
		}
		
		DrawCircle(0.05);
		

		
		 
		  downloadUrl("/newmaps_xmlparser.php?lat=" + latitude + "&lng=" + longitude + "&lang=" + lang + "&radius=" + radius + "", function(data) {
		  var xml = data.responseXML;
		  var markers = xml.documentElement.getElementsByTagName("marker");
		  for (var i = 0; i < markers.length; i++) {
			 var name = markers[i].getAttribute('name');
			 var id = markers[i].getAttribute('id');
			 var address = markers[i].getAttribute('address');
			 var type = markers[i].getAttribute('type');
			 var filename = markers[i].getAttribute('filename');
			 var positiononly = markers[i].getAttribute('positiononly');
			 var http = markers[i].getAttribute('http');
			 var typeurl = markers[i].getAttribute('typeurl');
			 var muniurl = markers[i].getAttribute('muniurl');
			 var email = markers[i].getAttribute('email');
			 var telephone = markers[i].getAttribute('telephone');
			 var distance = parseFloat(markers[i].getAttribute('distance'));
			 var point = new google.maps.LatLng(
				parseFloat(markers[i].getAttribute("lat")),
				parseFloat(markers[i].getAttribute("lng")));
			var html = '<div style="width: 280px; margin-left: 10px;"><img src="/images/pages/' + typeurl +'/' + id + '/' + filename +'" align="right" style="padding:5px 0 0 5px;" /><br /><a href="/' + lang + '/' + muniurl + '/' + typeurl + '/' + id + '.html" ><b>' + name + '</b></a> <br/>' + address + '</div>'
			var icon = customIcons[type] || {};

			var marker = new google.maps.Marker({
			  map: map,
			  position: point,
			  icon: icon.icon
			 
			});
			bindInfoWindow(marker, map, infoWindow, html);
		  }
		});
		
		

			
      }
	  var map;
			var markers = [];
			var directionsService = new google.maps.DirectionsService(); 
						
						
			function bindInfoWindow(marker, map, infoWindow, html) {
			google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(html);
			infoWindow.open(map, marker);
			});
		}
	
		function downloadUrl(url, callback) {
		  var request = window.ActiveXObject ?
			  new ActiveXObject('Microsoft.XMLHTTP') :
			  new XMLHttpRequest;
	
		  request.onreadystatechange = function() {
			if (request.readyState == 4) {
			  request.onreadystatechange = doNothing;
			  callback(request, request.status);
			}
		  };
	
		  request.open('GET', url, true);
		  request.send(null);
		}
		
		function doNothing() {}
		
		function calcRoute() {
			for (i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		  }
		  var start = markerLatLng;
		  var end = document.getElementById("end").value;
		  
		  var request = {
				origin:start,
				destination:end,
				travelMode: google.maps.TravelMode.DRIVING
		  };
		  
		  var directionsService = new google.maps.DirectionsService();
		
			
			var directionsRenderer = new google.maps.DirectionsRenderer();
			directionsRenderer.setMap(map);    
			
			 directionsRenderer.setPanel(document.getElementById('directionsPanel'));
		  
		  
		  
		  directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				 // Display the distance:
			 document.getElementById('distance').innerHTML = "<h4><strong>" +
				result.routes[0].legs[0].distance.value/1000 + " kms</strong> (" + Math.round(((result.routes[0].legs[0].distance.value/1000) * .98) + 3.25) + "€ approx Taxi fare)</h4>";
			  directionsDisplay.setDirections(result);
			}
		  });
		}
		
		
		
		
		
		
		 
		
