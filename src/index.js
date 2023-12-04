

fetch('http://localhost:3000/playlists')
.then(response => response.json())
.then(console.log)




const ratingSlider = document.getElementById('ratingSlider');
  const ratingValue = document.getElementById('ratingValue');

  ratingSlider.addEventListener('input', function() {
    const value = (parseFloat(this.value) / 10).toFixed(1); // Convert slider value to 0-1 range
    ratingValue.textContent = value;
  });