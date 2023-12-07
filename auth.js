import { clientId, clientSecret } from './credentials.js'


//const fetch = require('node-fetch'); // If using in Node.js

async function getAccessToken() {
    const credentialsBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            'method' : 'POST',
            'headers' : {
                'Authorization': `Basic ${credentialsBase64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            'body' : `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        });

        const data = await response.json();
        const accessToken = data.access_token;
        localStorage.setItem('accessToken', accessToken)
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

const accessToken = localStorage.getItem('accessToken')

var requestOptions = {
    'method' : 'GET',
    'headers' : {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${accessToken}`
    },
    'body' : "",
    'redirect' : 'follow'
  };
  
  let data = JSON.stringify(requestOptions)
  
  fetch("https://api.spotify.com/v1/tracks?ids=4MjDJD8cW7iVeWInc2Bdyj,1IHWl5LamUGEuP4ozKQSXZ,5pyoxDZ1PX0KxBxiRVxA4U,4DByEumlGTZKSzuVEZ35eo,11C4y2Yz1XbHmaQwO06s9f,2XU0oxnq2qxCpomAAuJY8K,27QvYgBk0CHOVHthWnkuWt,4q8PHoRsPUB52LFylX8Ulz,1oHNvJVbFkexQc0BpQp7Y4,1dzQoRqT5ucxXVaAhTcT0J,0HPD5WQqrq7wPWR7P7Dw1i,0RTzJVkunbGwuRjXDFHnjf,7MXVkk9YMctZqd1Srtv4MB,4OMJGnvZfDvsePyCwRGO7X,3iYNJX4FTRGlfMQySjlGNr,7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B\n\n", 
  data)
    .then(response => response.json())
    .then(tracks => {
      fetch("http://localhost:3000/tracks",{
        "method" : "POST",
        "headers" : {"Content-Type" : "application/json"},
        "body" : JSON.stringify(tracks)
      })})
    .catch(error => console.log('error', error));