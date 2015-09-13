var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="blue-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="blue-text"><i class="fa fa-phone fa-lg"></i></span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="blue-text"><i class="fa fa-envelope fa-lg"></i></span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="blue-text"><i class="fa fa-twitter fa-lg"></i></span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="blue-text"><i class="fa fa-github-alt fa-lg"></i></span><span class="white-text">%data%</span></li>';
var HTMLlinkedin = '<li class="flex-item"><span class="blue-text"><i class="fa fa-linkedin-square fa-lg"></i></span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="blue-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="blue-text"><i class="fa fa-map-marker fa-lg"></i></span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" alt="profile picture" class="biopic fade-in">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><div class="progress-radial progress-%value%"><div class="overlay">%data%</div></div></li>';
var HTMLworkStart = '<div class="work-entry flex-item pic pic-3d"></div>';
var HTMLworkEmployer = '<h3 class="work-employer">%data%</h3>';
var HTMLworkTitle = '<h2 class="work-title">%data%</h2>';
var HTMLworkLocation = '<p>%data%</p>';
var HTMLworkDates = '<div class="work-dates">%data%</div>';
var HTMLworkDescription = '<p class="work-description">%data%</p>';

var HTMLprojectStart = '<div class="project-entry flex-item pic pic-3d"></div>';
var HTMLprojectImage = '<img src="%data%" alt="%text%">';
var HTMLprojectSpan = '<span class="pic-caption open-down"></span>'
var HTMLprojectTitle = '<h1 class="pic-title"><a href="%link%" target="_blank">%data%</a></h1>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';

var HTMLschoolStart = '<div class="education-entry equalHW eq"></div>';
var HTMLschoolIcon = '<div class="center"><i class="fa fa-graduation-cap fa-2x"></i></div>';
var HTMLschoolName = '<h3 class="education-school center">%data%</h3>';
var HTMLschoolLocation = '<div class="school-location center">%data%</div>';
var HTMLschoolDegree = '<div class="degree center">%data%</div>';
var HTMLschoolDates = '<div class="date-text center">%data%</div>';

var HTMLonlineStart = '<div class="flex-item online-entry pic pic-3d"></div>';
var HTMLonlineDates = '<p class="month">%month% <br><span class="year">%year%</span></p>';
var HTMLonlineTitle = '<div class="course center">%data%</div>';
var HTMLonlineSchool = '<p class="school center">%data%</p>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

/*
The International Name
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function() {};
    $('#name').html(iName);
  });
});

/*
Collect Click Locations from map
*/
clickLocations = [];

function logClicks(x, y) {
  clickLocations.push({
    x: x,
    y: y
  });
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x,y);
});

/*
Generate custom Google Map
*/
var map; // declares a global map variable

/*
Call initializeMap() when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  appended googleMap to #mapDiv in resumeBuilder.js to display map
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat(); // latitude from the place service
    var lon = placeData.geometry.location.lng(); // longitude from the place service
    var name = placeData.formatted_address; // name of the place from the place service
    var bounds = window.mapBounds; // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: placeData.geometry.location,
      title: name
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // zoom when marker is clicked
    google.maps.event.addListener(marker, 'click', function() {
      map.setZoom(9);
      map.setCenter(marker.getPosition());
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});