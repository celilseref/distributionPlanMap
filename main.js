var ihtiyacListesi = [
    {
      "lat": 41.01224,
      "lng": 28.976074,
      "ihtiyac": "Sağlık Malzemesi",
      "stok": 100,
      "order": 1
    },
    {
      "lat": 41.01094,
      "lng": 28.97396,
      "ihtiyac": "Temel Gıda",
      "stok": 100,
      "order": 2
    },
    {
      "lat": 41.0144,
      "lng": 28.97962,
      "ihtiyac": "Isınma Gereci",
      "stok": 40,
      "order": 3
    },
    {
      "lat": 41.01216,
      "lng": 28.96807,
      "ihtiyac": "Giyecek",
      "stok": 60,
      "order": 4
    },
    {
        "lat": 41.0086,
           "lng": 28.9802,
        "ihtiyac": "Barınma",
        "stok": 200,
        "order": 5
      },
      {
        "lat": 41.0229,
           "lng": 28.9714,
        "ihtiyac": "Yiyecek",
        "stok": 70,
        "order": 6
      },
      {
        "lat": 41.01494,
        "lng": 28.97396,
        "ihtiyac": "Temel Gıda",
        "stok": 100,
        "order": 7
      },
      {
        "lat": 41.01094,
        "lng": 28.97196,
        "ihtiyac": "Çadır",
        "stok": 10,
        "order": 8
      },
      {
        "lat": 41.01094,
        "lng": 28.97396,
        "ihtiyac": "Sağlık Malzemesi",
        "stok": 60,
        "order": 9
      },
      {
        "lat": 41.01694,
        "lng": 28.96596,
        "ihtiyac": "Giyecek",
        "stok": 500,
        "order": 10
      },
      {
        "lat": 41.01634,
        "lng": 28.97796,
        "ihtiyac": "Temel Gıda",
        "stok": 200,
        "order": 11
      },
      {
        "lat": 41.01334,
        "lng": 28.97696,
        "ihtiyac": "Kıyafet",
        "stok": 1000,
        "order": 12
      },
     
    

  ];
  var harita;
  
  function initMap() {
    harita = new google.maps.Map(document.getElementById('harita'), {
      center: {lat: 41.0082, lng: 28.9784},
      zoom: 15
    });
  
    // İhtiyaç işaretleyicilerini ekle
    ihtiyacListesi.forEach(function(ihtiyac) {
      var marker = new google.maps.Marker({
        position: {lat: ihtiyac.lat, lng: ihtiyac.lng},
        map: harita,
        title: ihtiyac.ihtiyac
      });
  
      marker.addListener('click', function() {
        alert("Bu noktada " + ihtiyac.ihtiyac + " için " + ihtiyac.stok + " adet ihtiyaç var.");
      });
    });
  
    // En kısa rota için işaretleyicileri düzenle
    var ihtiyacListesiSorted = ihtiyacListesi.sort(function(a, b) {
      return a.order - b.order;
    });
  
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
      map: harita,
      suppressMarkers: true  // varsayılan işaretçileri kaldır
    });
  
    var waypts = [];
    for (var i = 0; i < ihtiyacListesiSorted.length; i++) {
      var latLng = new google.maps.LatLng(ihtiyacListesiSorted[i].lat, ihtiyacListesiSorted[i].lng);
      waypts.push({
        location: latLng,
        stopover: true
      });
    }
  
    var start = new google.maps.LatLng(41.023526, 28.947106); // Laleli Cami konumu
    var end = waypts.pop().location;
  
    var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };
  
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      }
    });
  }
  
  
            