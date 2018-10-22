// JavaScript Document
 //<![CDATA[
    
    function load() {
      if (GBrowserIsCompatible()) {
	  
	  function createMarker(point) {
        var marker = new GMarker(point);
        
        return marker;
      }
           

      // Display the map, with some controls and set the initial location 
      var minimap = new GMap2(document.getElementById("smallmap"));
	  minimap.addControl(new GSmallMapControl());
	  var MapDiv =document.getElementById("smallmap");
        var CopyrightDiv = MapDiv.firstChild.nextSibling;
        CopyrightDiv.style.left = "0px";
     
      
      minimap.setCenter(new GLatLng(<?php echo $lat;?>, <?php echo $lng;?>),8);
    
      // Set up three markers with info windows 
    
      var point = new GLatLng(<?php echo $lat;?>, <?php echo $lng;?>);
      var marker = createMarker(point)
      minimap.addOverlay(marker);

    }
    
    // display a warning if the browser was not compatible
    else {
      alert("Sorry, the Google Maps API is not compatible with this browser");
    }
}
    // This Javascript is based on code provided by the
    // Blackpool Community Church Javascript Team
    // http://www.commchurch.freeserve.co.uk/   
    // http://econym.googlepages.com/index.htm

    //]]>