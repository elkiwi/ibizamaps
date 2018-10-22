  //<![CDATA[
    var map;
				var minimap;
    var geocoder;
				var icon;
	

	
	var markerGroups = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "11": [], "12": [], "13": [], "14": [], "15": [], "16": [], "17": [], "18": [], "19": [], "20": [], "21": [], "22": [], "23": [], "24": [], "25": [], "26": [], "27": [], "28": [] };
	
	

	
	
	
	
	function initialize() {
		

		
		
		
			var customIcons = {
			  14: {
				icon: "/images/markers/beach.png"
			  },
			  1: {
				icon: '/images/markers/hotels.png'
			  },
			  4: {
				icon: '/images/markers/hotels.png'
			  },
			  2: {
				icon: '/images/markers/hotels.png'
			  },
			  3: {
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
			
        var mapOptions = {
          center :markerLatLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		
        

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		var infoWindow = new google.maps.InfoWindow;
		
		var weatherLayer = new google.maps.weather.WeatherLayer({
		  temperatureUnits: google.maps.weather.TemperatureUnit.CELCIUS
		});
		weatherLayer.setMap(map);
		
		var cloudLayer = new google.maps.weather.CloudLayer();
		cloudLayer.setMap(map);
		
		map.setOptions({styles: [


   {
     featureType: "poi.business",
     elementType: "labels",
     stylers: [
       { visibility: "off" }
     ]
   }
 ]});
		

		/*var marker = new google.maps.Marker({
		position: markerLatLng,
		map: map,
		icon: icon.icon
		 });*/
		 
		  downloadUrl("/location_xmlparser.php?lat=" + latitude + "&lng=" + longitude + "&lang=" + lang + "&radius=" + radius + "", function(data) {
		  var xml = data.responseXML;
		  var markers = xml.documentElement.getElementsByTagName("marker");
		  for (var i = 0; i < markers.length; i++) {
			 var name = markers[i].getAttribute('name');
			 var id = markers[i].getAttribute('id');
			 var address = markers[i].getAttribute('address');
			 var type = markers[i].getAttribute('type');
			 var image = markers[i].getAttribute('filename');
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
			var html = '<div style="width: 280px; margin-left: 10px;"><img src="/images/pages/' + id + '/' + image + '" align="right" style="padding:5px 0 0 5px;" /><br /><a href="/' + lang + '/' + muniurl + '/' + typeurl + '/' + id + '.html" ><b>' + name + '</b></a> <br/>' + address + '</div>'
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
   


    //]]>