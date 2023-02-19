(() => {
    const message = document.querySelector('#message');

    // check if the Geolocation API is supported
   if (!navigator.geolocation) {
        message.textContent = `Your browser doesn't support Geolocation`;
        message.classList.add('error');
        return;
    } 


    // handle success case
    function onSuccess(position) {
        const {
            latitude,
            longitude
        } = position.coords;

        message.classList.add('success');
        message.textContent = `Your location: (${latitude},${longitude})`;
    }

    // handle error case
    function onError() {
        message.classList.add('error');
        message.textContent = `Failed to get your location!`;
    }



   
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		dist = dist * 3280.84;

		return dist;
	}
}
    
   // navigator.geolocation.watchPosition(onSuccess, onError);

   var w = distance(46.7281162,-117.1655308,46.7281130,-117.1655392,"N");
   message.textContent = `User Proximity: ${w}`;
   // message.textContent = `java is stupid`;


  /*  var database = firebase.database();

    class Person {
        constructor(name, age, intrests) {
          this.name = name;
          this.age = age;
          this.intrests = intrests;
        }
      }

    var person = new Person('John Doe', 30, 'games');
    var ref = database.ref('people');

    ref.set({
        name: person.name,
        age: person.age,
        email: person.intrests
      });


    var readRef = database.ref('people');
    readRef.once('value').then(function(snapshot) {
    console.log(snapshot.val());
  }); */

})();