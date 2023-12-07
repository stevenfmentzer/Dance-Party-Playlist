//GLOBAL VARIABLES

let currentTrack;
let currentTrackElement;
let nextTrackElement;
let previousTrackElement;
const myForm = document.getElementById('myForm');

///////


//const fetch = require('node-fetch'); // If using in Node.js



var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer BQBqbvFduhjiN4v5x44VOTzh9-HMWpUpMZ399iveXzgT7wlaQYGy9v1mp_HG_8Ny_TGbR0ceAlOVRVNweewOSturH-k76ZTReqcfStCzPd8nv5Nxieg");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  
  fetch("https://api.spotify.com/v1/tracks?ids=4MjDJD8cW7iVeWInc2Bdyj,1IHWl5LamUGEuP4ozKQSXZ,5pyoxDZ1PX0KxBxiRVxA4U,4DByEumlGTZKSzuVEZ35eo,11C4y2Yz1XbHmaQwO06s9f,2XU0oxnq2qxCpomAAuJY8K,27QvYgBk0CHOVHthWnkuWt,4q8PHoRsPUB52LFylX8Ulz,1oHNvJVbFkexQc0BpQp7Y4,1dzQoRqT5ucxXVaAhTcT0J,0HPD5WQqrq7wPWR7P7Dw1i,0RTzJVkunbGwuRjXDFHnjf,7MXVkk9YMctZqd1Srtv4MB,4OMJGnvZfDvsePyCwRGO7X,3iYNJX4FTRGlfMQySjlGNr,7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B\n\n", 
  requestOptions)
    .then(response => response.json())
    .then(tracks => {
      console.log(tracks)
      tracks.tracks.forEach(track =>{
        (console.log(track))})
        fetch("http://localhost:3000/tracks",{
          "method" : "PUT",
          "headers" : {"Content-Type" : "application/json"},
          "body" : JSON.stringify(tracks)
        })})
      .catch(error => console.log('error', error));
/////////


////INITIALIZING FETCH

fetch('http://localhost:3000/tracks')
  .then(response => response.json())
  .then(tracks => {
    tracks.forEach(track =>{
      //postMyRating(track, 0)
      renderTrack(track);
    })
    displayTrackDetails(tracks[0])
  });


////FUNCTIONS

function displayTrackDetails(track) {
  currentTracker(track);
  displayMyRating(track);

  const displayArray = [
    ["album-name", track.album.name],
    ["album-track-count", track.album.total_tracks],
    ["artist", track.artists[0].name],
    ["song-name", track.name],
    ["spotify-id", track.id],
    ["position", track.track_number],
  ]

  displayArray.forEach(value => {
    document.getElementById(`${value[0]}`).textContent = value[1]
  })
}

function displayMyRating(track){
  fetch(`http://localhost:3000/myRatings/${track.id}`)
  .then(res => res.json())
  .then(data => document.getElementById("my-rating").textContent = data.rating)
}

function renderTrack(track){
  const newElement = document.getElementById("album-art");
    const imageElement = document.createElement("img");
    imageElement.className = "album-image"
    imageElement.id = track.id
    imageElement.src = track.album.images[1].url
    newElement.append(imageElement);

    imageElement.addEventListener("click", () => { 
      displayTrackDetails(track)
    })
}

function fetchThenDisplayTrack(id){
  fetch(`http://localhost:3000/tracks/${id}`)
  .then(res => res.json())
  .then(track => { 
    displayTrackDetails(track)})
}

function submitRatingInput() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
      alert('You rated: ' + selectedRating.value);
      patchRating(currentTrack, selectedRating.value)
    } else {
      alert('Please select a rating.');
    }
  }

function patchRating(track,rating){
  const data = { "rating" : rating }
  
  fetch(`http://localhost:3000/myRatings/${track.id}`, {
    "method" : "PATCH",
    "headers" : {"Content-Type" : "application/json"},
    "body" : JSON.stringify(data)
    })
    fetchThenDisplayTrack(track.id)
}

function deleteCurrentTrack(url){
  fetch(`http://localhost:3000/${url}/${currentTrack.id}`, {
    "method" : "DELETE",
    "headers" : {"Content-Type" : "application/json"}
  })

  currentTrackElement.remove()
  if (nextTrackElement) {
    fetchThenDisplayTrack(nextTrackElement.id)
  }
}

function previousSong(){
  const previousTrack = document.getElementById(currentTrack.id).previousElementSibling
  if (previousTrack) {
    fetchThenDisplayTrack(previousTrack.id)
  } else {throw new Error("You're at the first track")}
}

function nextSong(){
  const nextTrack = (document.getElementById(currentTrack.id).nextElementSibling)
  if (nextTrack) {
    fetchThenDisplayTrack(nextTrack.id)
  } else {throw new Error("You're on the last track")}
}

function currentTracker(track){
  currentTrack = track
  currentTrackElement = document.getElementById(track.id)
  if (currentTrackElement.nextElementSibling){
    nextTrackElement = currentTrackElement.nextElementSibling
  } else if (document.getElementsByClassName("album-image")[0]){
    nextTrackElement = document.getElementsByClassName("album-image")[0]
  } else { throw new Error("Your playlist is empty")}

  if (currentTrackElement.previousElementSibling){
    previousTrackElement = currentTrackElement.previousElementSibling
  }
}

function postMyRating(track, rating){
  const data = {
    "id": track.id,
    "rating": rating
  }
  fetch("http://localhost:3000/myRatings", {
    "method" : "POST",
    "headers" : {"Content-Type" : "application/json"},
    "body" : JSON.stringify(data)
  })
}


//// EVENT LISTENERS

document.getElementById('submit-button').addEventListener('submit', event => {
  event.preventDefault();
  submitRatingInput();
  displayMyRating(currentTrack);
  myForm.reset();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
      previousSong();
  }
  if (event.key === "ArrowRight") {
      nextSong();
  }});

document.getElementById("delete-button").addEventListener("click", () => {
  deleteCurrentTrack(myRatings)
  deleteCurrentTrack(tracks)
})








