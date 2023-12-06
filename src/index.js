
//Global variables

let currentTrack;

fetch('http://localhost:3000/playlists')
  .then(response => response.json())
  .then(playlists => {
    renderPlaylists(playlists);
  });

function renderPlaylists(playlists) {
  playlists.forEach(playlist => {
    renderSinglePlaylist(playlist) 
  });
}

function renderSinglePlaylist(playlist) {
  for (let i = 0; i < playlist.tracks.length; i++){
    renderTrack(playlist.tracks[i])
    displayTrackDetails(playlist.tracks[i])
    postMyRating(playlist.tracks[i], 0)
  }
}

function displayTrackDetails(track) {
  currentTrack = track;
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

  const target = track.id
  fetch(`http://localhost:3000/myRatings/${target}`)
    .then(res => res.json())
    .then(data => myRating.textContent = data.rating)
}

function renderTrack(track){
  const newElement = document.getElementById("album-art");
    const imageElement = document.createElement("img");
    imageElement.className = "album-image"
    imageElement.src = track.album.images[1].url
    newElement.append(imageElement);

    imageElement.addEventListener("click", () => { 
      displayTrackDetails(track)
    })
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

const submitButton = document.getElementById('button');
const myForm = document.getElementById('myForm');

submitButton.addEventListener('click', event => {
  event.preventDefault();
  submitRating();
  displayTrackDetails(currentTrack);
  console.log(myForm);
  myForm.reset();  // Use the reset method on the form
});

function submitRating() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
      alert('You rated: ' + selectedRating.value);
      patchRating(currentTrack,selectedRating.value)
    } else {
      alert('Please select a rating.');
    }
  }

function patchRating(track,rating){
  const data = {
    "rating": rating
  }
  const target = track.id
  fetch(`http://localhost:3000/myRatings/${target}`, {
    "method" : "PATCH",
    "headers" : {"Content-Type" : "application/json"},
    "body" : JSON.stringify(data)
  })
}

document.getElementById("delete-button").addEventListener("click", () => {
  console.log("click")
  deleteTrack(currentTrack)
})

function deleteTrack(track){
  const target = track.id
  fetch(`http://localhost:3000/myRatings/${target}`, {
    "method" : "DELETE",
    "headers" : {"Content-Type" : "application/json"}
  })

  fetch(`http://localhost:3000/playlists/${track}`,{
    "method" : "DELETE",
    "headers" : {"Content-Type" : "application/json"}
  })
}