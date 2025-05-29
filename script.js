const apiKey = "YOUR_API_KEY"; // Replace with your OMDb API key

function searchMovie() {
  const query = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("movieResult");

  if (!query) {
    resultDiv.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        resultDiv.innerHTML = `<p>Movie not found!</p>`;
        return;
      }

      resultDiv.innerHTML = `
        <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/150'}" width="150" />
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error fetching data.</p>`;
      console.error(error);
    });
}
