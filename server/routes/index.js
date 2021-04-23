var express = require('express');
var router = express.Router();
var axios = require('axios');


const maxResults = 10;

const addScore = (businesses) => {
  return businesses.slice(0, maxResults).map((business) => {
    const numReviews = business.review_count;
    const rating = business.rating;
    business.score = ((numReviews  * rating ) / (numReviews + 1)).toFixed(2);
    return business;
  })
}

/* GET home page. */
router.get('/:location', async function(req, res, next) {
  try {
    const resp = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`
        },
        params: {
          term: 'parking lot',
          location: req.params.location
        }
    });
    const businesses = addScore(resp.data.businesses);
    res.send(businesses);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
});

module.exports = router;
