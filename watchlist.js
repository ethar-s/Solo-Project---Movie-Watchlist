const notFound = document.getElementById("not-found")
const watchlistId = document.getElementById("watchlist-id")
const faCirclePlus = document.getElementById("submit-form")
const movieList = document.getElementById("movie-list")
const startupText = document.getElementById("startup-text")


if (JSON.parse(localStorage.getItem("usermovies")).movies.length === 0){   
    notFound.classList.remove("not-visible")
    watchlistId.classList.remove("not-visible")
    startupText.classList.remove("not-visible")
    faCirclePlus.addEventListener("click", async function(e){
        document.location.href="/index.html"
    })
} else {
    notFound.classList.add("not-visible")
    watchlistId.classList.add("not-visible")
    startupText.classList.add("not-visible")
    render() 
}



async function render() {
    await renderInnerHtml()
    if (JSON.parse(localStorage.getItem("usermovies")).movies.length > 0){
        for (const movie of JSON.parse(localStorage.getItem("usermovies")).movies) {
            document.getElementById(movie).addEventListener("click",function(e){
                const myStoagedMovies = JSON.parse(localStorage.getItem("usermovies"))
                if (myStoagedMovies.movies.includes(movie)) {
                    myStoagedMovies.movies.splice(myStoagedMovies.movies.indexOf(movie),1)
                    localStorage.setItem("usermovies", JSON.stringify(myStoagedMovies))
                    render()
                }
            })
        }   
    }
    
}

async function renderInnerHtml(){
    movieList.innerHTML=""
    if (JSON.parse(localStorage.getItem("usermovies")).movies.length > 0){
        for (const item of JSON.parse(localStorage.getItem("usermovies")).movies) {
        const resMovie = await fetch(`https://www.omdbapi.com/?apikey=3935936e&i=${item}&type=movie&plot=short`)
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
                            <i class="fa-solid fa-circle-minus" id="${dataMovie.imdbID}"></i>
                            <p>Watchlist</p>
                        </form>
                    </div>
                </div>
                <p class="movie-plot">${dataMovie.Plot}</p>
            </div>
        </div>
        `
        }
    } else {
    notFound.classList.remove("not-visible")
    watchlistId.classList.remove("not-visible")
    startupText.classList.remove("not-visible")
    faCirclePlus.addEventListener("click", async function(e){
        document.location.href="/index.html"
        })
    }
}