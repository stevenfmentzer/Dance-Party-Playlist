


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

