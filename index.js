const submitBtn = document.getElementById("submit-btn")
const searchField = document.getElementById("search")
const notFound = document.getElementById("not-found")
const startExploring = document.getElementById("start-exploring")
const movieIcon = document.getElementById("movie-icon")
const movieList = document.getElementById("movie-list")
const startupText = document.getElementById("startup-text")
const submitForm = document.getElementById("submit-form")


const usermovies = {
    movies:[]
}

const userStorageParse = JSON.stringify(usermovies)
if (!localStorage.getItem("usermovies")) {
    localStorage.setItem("usermovies",userStorageParse)
}

submitBtn.addEventListener("click", async function(e) {
    e.preventDefault()
    const res = await fetch(`https://www.omdbapi.com/?apikey=3935936e&s=${searchField.value}&type=movie`);
    const data = await res.json()
    if (data.Response === "False"){
        movieList.innerHTML = ""
        movieIcon.classList.add("not-visible")
        startExploring.classList.add("not-visible")
        notFound.classList.remove("not-visible")
        startupText.classList.remove("not-visible")
    } else {
        movieList.innerHTML = ""
        movieIcon.classList.add("not-visible")
        startExploring.classList.add("not-visible")
        notFound.classList.add("not-visible")
        startupText.classList.add("not-visible")
        const myMovieList = []
        for (movies of data.Search) {
            const resMovie = await fetch(`https://www.omdbapi.com/?apikey=3935936e&i=${movies.imdbID}&type=movie&plot=short`)
            const dataMovie = await resMovie.json()
            movieList.innerHTML += `
            <div class="movie-detail">
                <img class="movie-img" src="${dataMovie.Poster}" onerror="this.src='/img/A_black_image.jpg'">
                <div class="movie-rate-time-type-add">
                    <div class="movie-rate">
                        <h3 class="movie-name">${dataMovie.Title}</h3>
                        <i class="fa-solid fa-star"></i>
                        <p class="rating">${dataMovie.imdbRating}</p>
                    </div>
                    <div class="time-type-add" id="time-type-add">
                        <p>${dataMovie.Runtime}<p/>
                        <p>${dataMovie.Genre}<p/>
                        <div class="icon-watchlist" id="watchlist">
                            <form for="submit-form" class="submit-form">
                                <i class="fa-solid fa-circle-plus" id="${movies.imdbID}"></i>
                                <p>Watchlist</p>
                            </form>
                        </div>
                    </div>
                    <p class="movie-plot">${dataMovie.Plot}</p>
                </div>
            </div>
            `
            myMovieList.push(movies.imdbID)
        }
        for (const movie of myMovieList) {
            document.getElementById(movie).addEventListener("click",function(e){
            console.log(e.target.id)
            const myStoagedMovies = JSON.parse(localStorage.getItem("usermovies"))
            console.log(myStoagedMovies)
            if (!myStoagedMovies.movies.includes(movie)) {
                myStoagedMovies.movies.push(movie)
                localStorage.setItem("usermovies", JSON.stringify(myStoagedMovies))
            }
        })
        }       
    }
})

