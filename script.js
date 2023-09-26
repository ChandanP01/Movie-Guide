const search_form = document.querySelector('form');
const search_container = document.querySelector('#search_query');
const movie_container = document.querySelector('.movie_container');

async function getMovieInfo(movie) {
    try {
        const api_key = "dc393334";
        const url = `https://www.omdbapi.com/?apikey=${api_key}&t=${movie}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch data...")
        }

        const data = await response.json();
        console.log(data);
        showMovieData(data);
    } catch (error) {
        displayError("No Movie Found...");
    }
}

function showMovieData(data) {
    movie_container.classList.remove('no_background');
    movie_container.innerHTML = "";

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, BoxOffice } = data;

    // Create and append Title and rating section
    const movie_element = document.createElement('div');
    movie_element.classList.add('movie-info');
    movie_element.innerHTML = `<h2>${Title}</h2>
                                <p><strong>Rating : &#11088 </strong>${imdbRating}</p>`;

    // Create and append Genre section
    const movie_genre_element = document.createElement('div');
    movie_genre_element.classList.add('movie-genre');
    Genre.split(',').forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movie_genre_element.appendChild(p);
    });
    movie_element.appendChild(movie_genre_element);

    // Create and append released date, runtime, actors, plot and poster
    movie_element.innerHTML += `<p><strong>Released Date : </strong>${Released}</p>
                                <p><strong>Running Time : </strong>${Runtime}</p>
                                <p><strong>Actors : </strong>${Actors}</p>
                                <p><strong>Plot : </strong>${Plot}</p>`;
    if (BoxOffice !== 'N/A') {
        movie_element.innerHTML += `<p><strong>Box Office Collection : </strong>${((Number.parseInt(BoxOffice.replace(/[$,]/g, "")) * 83.22) / 1000000).toFixed(2)}  Crores</p>`;
    } else {
        movie_element.innerHTML += `<p><strong>Box Office Collection : </strong>Not Available</p>`
    }
    const movie_poster = document.createElement('div');
    movie_poster.classList.add('movie-poster');
    movie_poster.innerHTML = `<img src="${Poster}"/>`;

    movie_container.appendChild(movie_poster);
    movie_container.appendChild(movie_element);
}

function displayError(message) {
    movie_container.innerHTML = `<h2>${message}</h2>`;
    movie_container.classList.add('no_background');
}

search_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movie_name = search_container.value.trim();
    if (movie_name !== '') {
        displayError("Fetching Movie details...")
        getMovieInfo(movie_name);
    } else {
        displayError("Enter movie name to get Information...");
    }
});