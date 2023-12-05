


fetch('http://localhost:3000/playlists')
  .then(response => response.json())
  .then(albums => {
    renderPlaylists(albums);
  });

function renderPlaylists(albums) {
  playlists.forEach(renderSinglePlaylist);
}

function renderSinglePlaylist(albulms) {
  const newElement = document.getElementById("album-art");
  const spanElement = document.createElement("img");
  spanElement.src = album.tracks;
  newElement.append(spanElement);
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