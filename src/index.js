
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
  const albumName = document.getElementById("album-name")
  const albumTracks = document.getElementById("album-track-count")
  const artist = document.getElementById("artist")
  const songName = document.getElementById("song-name")
  const spotifyId = document.getElementById("spotify-id")
  const position = document.getElementById("position")
  const myRating = document.getElementById("my-rating")

  albumName.textContent = track.album.name
  albumTracks.textContent = track.album.total_tracks
  artist.textContent = track.artists[0].name
  songName.textContent = track.name
  spotifyId.textContent = track.id
  position.textContent = track.track_number

  fetch(`http://localhost:3000/myRatings/${track.id}`)
    .then(res => res.json())
    .then(data => myRating.textContent = data.rating)
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

async function postMyRating(track, rating){
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

function submitRating() {
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
    fetchDisplayTrack(track.id)
}

function deleteCurrentTrack(){
  fetch(`http://localhost:3000/myRatings/${currentTrack.id}`, {
    "method" : "DELETE",
    "headers" : {"Content-Type" : "application/json"}
  })

  fetch(`http://localhost:3000/tracks/${currentTrack.id}`,{
    "method" : "DELETE",
    "headers" : {"Content-Type" : "application/json"}
  })

  currentTrackElement.remove()
  if (nextTrackElement) {
    fetchDisplayTrack(nextTrackElement.id)
  }
}

function previousSong(){
  const previousTrack = document.getElementById(currentTrack.id).previousElementSibling
  if (previousTrack) {
    fetchDisplayTrack(previousTrack.id)
  } else {throw new Error("You're at the first track")}
}

function nextSong(){
  const nextTrack = (document.getElementById(currentTrack.id).nextElementSibling)
  if (nextTrack) {
    fetchDisplayTrack(nextTrack.id)
  } else {throw new Error("You're on the last track")}
}

function fetchDisplayTrack(id){
  fetch(`http://localhost:3000/tracks/${id}`)
  .then(res => res.json())
  .then(track => { 
    displayTrackDetails(track)})
}


//NOT YET IN USE
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


// function renderPlaylists(playlists) {
//   playlists.forEach(playlist => {
//     renderSinglePlaylist(playlist) 
//   });
// }

// function renderSinglePlaylist(playlist) {
//   for (let i = 0; i < playlist.tracks.length; i++){
//     renderTrack(playlist.tracks[i])
//     displayTrackDetails(playlist.tracks[i])
//     postMyRating(playlist.tracks[i], 0)
//   }
// }


//// EVENT LISTENERS

document.getElementById('submit-button').addEventListener('submit', event => {
  event.preventDefault();
  submitRating();
  displayTrackDetails(currentTrack);
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
  deleteCurrentTrack()
})