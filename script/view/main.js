$('.search-button').on('click', function () {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=b25953ce&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(movie => {
                cards += `
                <div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${movie.Poster}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                        </div>
                    </div>
                </div>`;
            });
            $('.movie-container').html(cards);

            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=b25953ce&i=' + $(this).data('imdbid'),
                    success: movie => {
                        const movieDetail = `<div class="modal-header">
                                                <h5 class="modal-title" id="movieDetailModalLabel">${movie.Title} (${movie.Year})</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="container-fluid">
                                            <div class="row mt-3">
                                                <div class="col-md-3">
                                                    <img src="${movie.Poster}" class="img-fluid">
                                                </div>

                                                <div class="col-md">
                                                    <ul class="list-group">
                                                        <li class="list-group-item">
                                                            <h4>${movie.Title} (${movie.Year})</h4>
                                                        </li>
                                                        <li class="list-group-item"><strong>Director : </strong> ${movie.Director}</li>
                                                        <li class="list-group-item"><strong>Actors : </strong> ${movie.Actors}</li>
                                                        <li class="list-group-item"><strong>Writer : </strong> ${movie.Writer}</li>
                                                        <li class="list-group-item"><strong>Plot : </strong> ${movie.Plot}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>`;
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });

});

class AppBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :host {
                display: block;
                width: 100%;
                background-color: #1f4068;
                color: white;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                position: sticky;
            }
            h1 {
                padding: 16px;
            }
        </style>
        <h1>Mini Movie Library</h1>`;
    }
}

customElements.define("app-bar", AppBar);