# phase-1-project


Setup
Run json-server from this directory.

json-server --watch db.json
Test your server by visiting this route in the browser:

http://localhost:3000/playlists
http://localhost:3000/myRatings

Then, open the index.html file on your browser to run the application.

Write your code in the index.js file.

<h2>Important Data Point Locations:</h2>

    Album Name: playlists[index].tracks[index].album.name
    Album Art: playlists[index].tracks[index]album.images[1].url
    Number of Tracks in Album: playlists[index].tracks[index]album.total_tracks
    Artist: playlists[index].tracks[index]artists.artist
    Song Name: playlists[index].tracks[index]artists.name
    Song Spotify ID: playlists[index].tracks[index]artists.id
    Song position in album: playlists[index].tracks[index]artists.track_number

<h3>.myRatings</h3>

    "spotifyId" : "7ouMYWpwJ422jRcDASZB7P"
    "rating" : "0"
    "id": 1

<h2>FETCH REQUESTS for DB.JSON</h2>

    GET: Fetch all songs from one playlist and display them in nav-bar element
    POST: Add new playlist
    PATCH: Editing Key value pair PATCH Updating: 'dancability' and or other data points
    DELETE: Delete song from playlist

<h2>STRETCH GOALS requiring direct access to Spotify API</h2>

    GET: Search for song and receive track data?
    POST: Add new song to a playlist
    DELETE: Delete playlists


<h2>TO DO LIST:</h2>
    Build the index.HTML page structure
    Build the index.js and how it interacts with DOM



