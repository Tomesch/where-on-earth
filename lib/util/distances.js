function getDistance (start, end, decimals) {
    /** Converts numeric degrees to radians */
    if(typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function () {
            return this * Math.PI / 180;
        }
    }

    var decimals = decimals || 3;
    var earthRadius = 6371; // km
    var lat1 = parseFloat(start.latitude);
    var lat2 = parseFloat(end.latitude);
    var lon1 = parseFloat(start.longitude);
    var lon2 = parseFloat(end.longitude);
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();
 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
};


exports.sortByDistance = function(pct, coords) {
    var dist;
    var arrayWithDist = [];
    for(var coord in coords) {
        dist = getDistance(pct, coords[coord]);
        arrayWithDist.push({ name: coords[coord].player, latitude : coords[coord].latitude, longitude : coords[coord].longitude, distance : dist });
    }
    return arrayWithDist.sort(function(a, b) { return b.distance - a.distance; });
};