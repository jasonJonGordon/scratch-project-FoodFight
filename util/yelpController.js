const rp = require('request-promise-native');

const token = '6i0pYlDOl4BDG3lS0pIKSZu96vUhx0NpPyFH6EKDVDrqTc1PNHxQUBz8PlIpo6xyVWyPMnkxaX9yh07IVwXx4wt5P6Iv8uzDdkxTnSNo9bzvt0Aseljt2DSMhe2lWXYx';

const yelpController = {

  getData(term, location = '90292') {
    const options = {
      uri: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
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
