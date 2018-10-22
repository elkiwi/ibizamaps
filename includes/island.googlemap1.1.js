  //<![CDATA[
    var map;
	var minimap;
    var geocoder;
	
	var markerGroups = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "11": [], "12": [], "13": [], "14": [], "15": [], "16": [], "17": [], "18": [], "19": [], "20": [], "21": [], "22": [], "23": [], "24": [], "25": [], "26": [] };
	
	var baseIcon = new GIcon();
    baseIcon.iconSize=new GSize(20,20);
    baseIcon.iconAnchor=new GPoint(8,12);
    baseIcon.infoWindowAnchor=new GPoint(12,0);
	
	var smIcon = new GIcon();
    smIcon.iconSize=new GSize(15,15);
    smIcon.iconAnchor=new GPoint(7,0);
    smIcon.infoWindowAnchor=new GPoint(12,0);

	
	var gicons = [];
      gicons["1"] = new GIcon(baseIcon, "/images/markers/hotels.png");
      gicons["2"] = new GIcon(baseIcon, "/images/markers/hotels.png");
      gicons["3"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["4"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["5"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["6"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["8"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["7"]  = new GIcon(baseIcon, "/images/markers/property.png");
	  gicons["9"]  = new GIcon(baseIcon, "/images/markers/shops.png");
	  gicons["10"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["11"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["12"]  = new GIcon(baseIcon, "/images/markers/activities.png");
	  gicons["13"]  = new GIcon(baseIcon, "/images/markers/town.png");
	  gicons["14"]  = new GIcon(baseIcon, "/images/markers/beach.png");
	  gicons["15"]  = new GIcon(baseIcon, "/images/markers/bars.png");
	  gicons["16"]  = new GIcon(baseIcon, "/images/markers/restaurants.png");
	  gicons["17"]  = new GIcon(baseIcon, "/images/markers/beachbars.png");
	  gicons["18"]  = new GIcon(baseIcon, "/images/markers/transport.png");
	  gicons["19"]  = new GIcon(baseIcon, "/images/markers/club.png");
	  gicons["20"]  = new GIcon(baseIcon, "/images/markers/points-of-interest.png");
	  gicons["21"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["22"]  = new GIcon(baseIcon, "/images/markers/town.png");
	  gicons["23"]  = new GIcon(baseIcon, "/images/markers/hotels.png");
	  gicons["24"]  = new GIcon(baseIcon, "/images/markers/petrol.png");
	  gicons["25"]  = new GIcon(baseIcon, "/images/markers/supermarkets.png");
	  gicons["26"]  = new GIcon(baseIcon, "/images/markers/property.png");
	  
	  

		
    function load() {
      if (GBrowserIsCompatible()) {
	  	geocoder = new GClientGeocoder();
		
		//main map
		
		
		
		map = new GMap2(document.getElementById("map"));

        map.setCenter(new GLatLng(latitude,longitude), 11);
		map.addControl(new GSmallZoomControl3D ());
		//map.addControl(new GLargeMapControl3D());
      	map.addControl(new GMapTypeControl());
		map.addControl(new GScaleControl());
		

		
		map.addControl(new GOverviewMapControl(new GSize(175,100)));
		var center = map.getCenter();
	  
      	
		
		}  

      
	 
	 
}  //close onload

	
function searchLocationsNear() {
	 var gmarkersA = [];      
     var gmarkersB = [];      
     var gmarkersC = [];      
     var gmarkersD = [];   
     var radius = 25;
     var searchUrl = '/islandmap_xmlparser.php?lat=' + latitude + '&lng=' + longitude + '&radius=' + radius;
     GDownloadUrl(searchUrl, function(data) {
       var xml = GXml.parse(data);
       var markers = xml.documentElement.getElementsByTagName('marker');
	   
	  
       map.clearOverlays();
       var sidebar = document.getElementById('side_bar');
       sidebar.innerHTML = '';
       if (markers.length == 0) {
         sidebar.innerHTML = 'No results found.';
         map.setCenter(new GLatLng(latitude, longitude), 17);
         return;
       }
	   
	   
	   var bounds = new GLatLngBounds();
       for (var i = 0; i < markers.length; i++) {
         var name = markers[i].getAttribute('name');
		 var id = markers[i].getAttribute('id');
         var address = markers[i].getAttribute('address');
		 var type = markers[i].getAttribute('type');
		 var impage = markers[i].getAttribute('impage');
		 var positiononly = markers[i].getAttribute('positiononly');
		 var http = markers[i].getAttribute('http');
		 var typeurl = markers[i].getAttribute('typeurl');
		 var muniurl = markers[i].getAttribute('muniurl');
		 var email = markers[i].getAttribute('email');
		 var telephone = markers[i].getAttribute('telephone');
         var distance = parseFloat(markers[i].getAttribute('distance'));
         var point = new GLatLng(parseFloat(markers[i].getAttribute('lat')),
                                 parseFloat(markers[i].getAttribute('lng')));
         
		 
		 
		if (parseInt(type) < 13) {
             var marker = createMarker(point, name, id, address, type, http, typeurl, muniurl, email, telephone, impage, positiononly);
         
		 map.addOverlay(marker);
         var sidebarEntry = createSidebarEntry(marker, name, type);
         sidebar.appendChild(sidebarEntry);
         bounds.extend(point);
          }

         
       }
       
     });
   }

    function createMarker(point, name, id, address, type, http, typeurl, muniurl, email, telephone, impage, positiononly) {
      var marker = new GMarker(point, gicons[type]  );
	  markerGroups[type].push(marker);
	  if ( (impage == 0) && (positiononly == 0) ) {
      var html = '<a href="' + http +'" target="_blank"><b>' + name + '</b></a> <br/>' + address + '<br/>' + telephone;
	  }
	  
	  if ( (impage == 0) && (positiononly == 1) ) {
      var html = '<p><b>' + name + '</b><br/>' + address + '<br/>' + telephone + '</p>';
	  }
	  
	  else {
	   var html = '<div style="width: 280px; margin-left: 10px;"><img src="/images/pages/' + typeurl +'/' + id + '/th_image.jpg" align="right" style="padding:15px 0 0 5px;" /><br /><a href="/' + lang + '/' + muniurl + '/' + typeurl + '/' + id + '.html" ><b>' + name + '</b></a> <br/>' + address + '<br /><b>Tel:</b> ' + telephone + '<br/><a href="/' + lang + '/' + muniurl + '/' + typeurl + '/' + id + '.html" >Read more...</a></div'; 
	   }
      GEvent.addListener(marker, 'click', function() {
        marker.openInfoWindowHtml(html);
      });
      return marker;
    }
	
	


      function createSidebarEntry(marker, name, type) {
      var div = document.createElement('div');
      var html = '<b>' + name + '</b>';
      div.innerHTML = html;
      div.style.cursor = 'pointer';
      div.style.marginBottom = '5px'; 
      GEvent.addDomListener(div, 'click', function() {
        GEvent.trigger(marker, 'click');
      });
      GEvent.addDomListener(div, 'mouseover', function() {
        div.style.backgroundColor = '#eee';
      });
      GEvent.addDomListener(div, 'mouseout', function() {
        div.style.backgroundColor = '#fff';
      });
      return div;
    }   

	
       


    //]]>