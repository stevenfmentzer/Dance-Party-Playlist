//GLOBAL VARIABLES

let currentTrack;
let currentTrackElement;
let nextTrackElement;
let previousTrackElement;
const myForm = document.getElementById('myForm');


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