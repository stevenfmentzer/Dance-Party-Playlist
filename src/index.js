


fetch('http://localhost:3000/playlists')
  .then(response => response.json())
  .then(playlists => {
    renderPlaylists(playlists);
  });

function renderPlaylists(playlists) {
  playlists.forEach(playlist =>{
   renderSinglePlaylist(playlist) 
  });
}

function renderSinglePlaylist(playlist) {
  const newElement = document.getElementById("album-art");
  const imageElement = document.createElement("img");
  imageElement.src = playlist[0].tracks[0].playlist.images[1].url
  newElement.append(imageElement);
}





// const ratingSlider = document.getElementById('ratingSlider');
//   const ratingValue = document.getElementById('ratingValue');

//   ratingSlider.addEventListener('input', function() {
//     const value = (parseFloat(this.value) / 10).toFixed(1); // Convert slider value to 0-1 range
//     ratingValue.textContent = value;
//   });

function submitRating() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
      alert('You rated: ' + selectedRating.value);
      // You can handle the rating submission here, e.g., send it to a server
    } else {
      alert('Please select a rating.');
    }
  }