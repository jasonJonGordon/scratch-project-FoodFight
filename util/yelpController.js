const rp = require('request-promise-native');

const token = '6i0pYlDOl4BDG3lS0pIKSZu96vUhx0NpPyFH6EKDVDrqTc1PNHxQUBz8PlIpo6xyVWyPMnkxaX9yh07IVwXx4wt5P6Iv8uzDdkxTnSNo9bzvt0Aseljt2DSMhe2lWXYx';

const yelpController = {

  getData(term, coordsList) {
    if (!coordsList.length) coordsList = [[33.9794389, -118.4224384], [34.0407, 118.2468]];
    const coords = coordsList.length === 1 ? [coordsList[0].lat, coordsList[0].lng] : midPoint(coordsList);
    const options = {
      uri: `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${coords[0]}&longitude=${coords[1]}`,
      // uri: `https://api.yelp.com/v3/businesses/search?term=${term}&location=90292`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return rp(options).then((yelpApi) => {
      const topBiz = JSON.parse(yelpApi).businesses[0];
      const yelp = {
        name: topBiz.name,
        image_url: topBiz.image_url,
        location: topBiz.location.display_address,
        phone: topBiz.phone,
        url: topBiz.url,
      };
      return Promise.resolve(yelp);
    });
  },

};

module.exports = yelpController;

function midPoint(dataset) {
  // Calculate Coordinates to Radians
  const datasetRad = [];
  for (let i = 0; i < dataset.length; i++) {
      let latRad = dataset[i].lat * (Math.PI / 180)
      let lngRad = dataset[i].lng * (Math.PI / 180)
      datasetRad.push({ latRad, lngRad })
  }
  //console.log(datasetRad)
  //Calculate Radians to Cartesian Coordinates
  let datasetCart = [];
  for (let j = 0; j < datasetRad.length; j++) {
      let latCart = Math.cos(datasetRad[j].latRad) * Math.cos(datasetRad[j].lngRad)
      let lngCart = Math.cos(datasetRad[j].latRad) * Math.sin(datasetRad[j].lngRad)
      let sineLat = Math.sin(datasetRad[j].latRad)
      datasetCart.push({ "x": latCart, "y": lngCart, "z": sineLat })
  }
  //console.log(datasetCart)
  //Calculate Mean of X
  let sum1 = 0;
  for (let k = 0; k < datasetCart.length; k++) {
      sum1 = sum1 + datasetCart[k].x
  }
  let meanX = sum1 / datasetCart.length;
  //console.log(meanX)
  //Calculate Mean of Y
  let sum2 = 0;
  for (let l = 0; l < datasetCart.length; l++) {
      sum2 = sum2 + datasetCart[l].y
  }
  let meanY = sum2 / datasetCart.length;
  //console.log(meanY)
  //Calculate Mean of Z
  let sum3 = 0;
  for (var m = 0; m < datasetCart.length; m++) {
      sum3 = sum3 + datasetCart[m].z
  }
  let meanZ = sum3 / datasetCart.length;
  //console.log(meanZ)
  //Turn Cartesian of Midpoint into Coordinates
  let midpoint = [meanX, meanY, meanZ]
  let lon = Math.atan2(meanY, meanX)
  let hyp = Math.sqrt(meanX * meanX + meanY * meanY)
  let lat = Math.atan2(meanZ, hyp)
  lat = lat * (180 / Math.PI)
  lon = lon * (180 / Math.PI)
  midpoint = [lat, lon]
  return midpoint
}
