import { clientId, clientSecret } from './credentials.js'


//const fetch = require('node-fetch'); // If using in Node.js

var client_id = clientId;
var client_secret = clientSecret;

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//   }
// });


// console.log(`TOKEN: ${token}`)



var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer BQBqbvFduhjiN4v5x44VOTzh9-HMWpUpMZ399iveXzgT7wlaQYGy9v1mp_HG_8Ny_TGbR0ceAlOVRVNweewOSturH-k76ZTReqcfStCzPd8nv5Nxieg");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
  
  fetch("https://api.spotify.com/v1/tracks?ids=4MjDJD8cW7iVeWInc2Bdyj,1IHWl5LamUGEuP4ozKQSXZ,5pyoxDZ1PX0KxBxiRVxA4U,4DByEumlGTZKSzuVEZ35eo,11C4y2Yz1XbHmaQwO06s9f,2XU0oxnq2qxCpomAAuJY8K,27QvYgBk0CHOVHthWnkuWt,4q8PHoRsPUB52LFylX8Ulz,1oHNvJVbFkexQc0BpQp7Y4,1dzQoRqT5ucxXVaAhTcT0J,0HPD5WQqrq7wPWR7P7Dw1i,0RTzJVkunbGwuRjXDFHnjf,7MXVkk9YMctZqd1Srtv4MB,4OMJGnvZfDvsePyCwRGO7X,3iYNJX4FTRGlfMQySjlGNr,7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B\n\n", 
  requestOptions)
    .then(response => response.json())
    .then(tracks => {
      console.log(tracks)
    })
    // .then(tracks => {
    //   fetch("http://localhost:3000/tracks",{
    //     "method" : "POST",
    //     "headers" : {"Content-Type" : "application/json"},
    //     "body" : JSON.stringify(tracks)
    //   })})
    // .catch(error => console.log('error', error));