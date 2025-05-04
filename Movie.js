const API_KEY = '967cafcfac3e79ea7637fde9fb318be3';
const API_URL = 'https://api.themoviedb.org/3/movie/popular?';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


let moviecontainer = document.querySelector(".movie-container");
let modalcontainer = document.querySelector(".modal-container");
let close = document.querySelector(".close");
let movietitle = document.querySelector(".movie-title");
let moviedetail = document.querySelector(".movie-detail");

const usetemplate = document.querySelector("[data-use-template]");
const usecontainer = document.querySelector("[data-use-container]");
const searchinput = document.querySelector("[data-search]");

let use = [];

searchinput.addEventListener("input", function(event) {
    event.preventDefault();
    const values = searchinput.value.toLowerCase();
    const cards=usecontainer.querySelectorAll(".card");
   
    cards.forEach((card) => {
        const title = card.querySelector("[data-title]").textContent.toLowerCase();

        if(title.includes(values)){
            card.style.display="";
        }
        else{
            card.style.display="none";
        }

    });
});

async function load() {
    try {
        const res = await fetch(`${API_URL}api_key=${API_KEY}&page=1`);
        const data = await res.json();
        usecontainer.innerHTML="";

            data.results.map(e => {
            
            const card = usetemplate.content.cloneNode(true).children[0];
            const image = card.querySelector("[data-image]");
            const title = card.querySelector("[data-title]");
            const rate = card.querySelector("[data-rate]");
            const date=card.querySelector("[data-date]");
            
            title.textContent = e.title;
            rate.textContent = e.vote_average;
            date.textContent = e.release_date;

            image.src=(`${IMG_URL}${e.poster_path}`);
            image
            usecontainer.append(card);

            image.addEventListener("click", function() {
                 {
                    moviedetail.innerHTML = e.overview;
                    movietitle.innerHTML = e.title;
                    modalcontainer.classList="modal-container show";
            
                }
            })



            return{title: e.title, element:card}
        

        });
    
    }
catch (err) {console.error(err);}
}
load();


close.addEventListener("click", () => {
    modalcontainer.classList = "modal-container hide"

})


const buildTheDom = (results) => {
    results.forEach((movie) => {
        moviecontainer.innerHTML += `
        <div class="movie">
                <input type="hidden" value="${movie.overview}">
                
            <img 
            class="movie-image"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top"
                            alt="...">
                           
                            <div class="card-body">
                                <span class="card-title">${movie.title}</span>
                                <span class="card-text">${movie.vote_average}</span>
                                <span class="card-text">${movie.release_date}
                                </span>
                            </div>
                        </div>
        </div>`



    });

}
async function getPopularMovie() {
    const req = await
        fetch(`${API_URL}api_key=${API_KEY}&page=1`);
    const { results } = await req.json();
    buildTheDom(results);

}
getPopularMovie()


