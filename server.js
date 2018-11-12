/* eslint-disable no-console */
const express = require("express");
const fs = require('fs');
const app = express();

app.use(express.json());

const moviesPath = `model/movies.json`;
const usersPath = `model/users.json`;

let movies;
let users;

// Functions to load files
function loadMovies(moviesFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(moviesFile, (err, data) => {
            if (err) {
                reject(err);
            } else {
                movies = JSON.parse(data);
                resolve(movies);
            }
        });
    });
}

function loadUsers(usersFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(usersFile, (err, data) => {
            if (err) {
                reject(err);
            } else {
                users = JSON.parse(data);
                resolve(users);
            }
        })
    });
}

// Functions to generate IDs
function generateMovieId() {
    let moviesLength = movies.length;
    return (moviesLength + 1).toString();
}

function generateUserId() {
    return (Math.round(Math.random() * 999999 + 111111)).toString();
}

// Endpoints
// GET all movies
app.get('/api/movies', (req, res) => res.json(movies));

// GET all users
app.get("/api/users", (req, res) => res.json(users));

// GET a specific movie
app.get('/api/movies/:query', (req, res) => {
    let query = req.params.query.toLowerCase().replace(/\+/, ' ');
    let [key, value] = query.split('=');
    if (key === 'id' || key === 'title' || key === 'director' || key === 'likes') {
        const movie = movies.find(movie => movie[key] === value);
        if (movie == undefined) {
            res.json(`Movie not found.`);
        }
        res.json(movie);
    } else {
        res.json(`Search parameter may be incorrect.`);
    }
});

// POST a movie defining title and director
app.post('/api/movies/add', (req, res) => {
    let {
        title,
        director
    } = req.body;
    let newMovie = {
        id: generateMovieId(),
        title: title,
        director: director,
        likes: 0
    }
    movies.push(newMovie);
    res.json(newMovie);
});

// POST an user
app.post("/api/users/add", (req, res) => {
    let {
        username,
        password
    } = req.body;
    // console.log(newUser);
    let newUser = {
        id: generateUserId(),
        username: username,
        password: password
    }
    // if (!newUser || newUser !== undefined || newUser !== null) {
    //     res.status(400).send("Debes pasarme algo en el Body");
    // } else {
    users.push(newUser);
    res.json(newUser);
    // }
});

// Update movie with PUT
app.put('/api/movies/update/:id', (req, res) => {
    const movieId = req.params.id;
    let movieToUpdate = movies.filter(movie => {
        return movie.id == movieId;
    });
    movieToUpdate[0].title = req.body.title;
    movieToUpdate[0].director = req.body.director;
    res.json(movieToUpdate[0]);
});

// Add likes through PUT
app.put('/api/movies/like/:id', (req, res) => {
    let movieId = req.params.id;
    let movieToAddLike = movies.filter(movie => {
        return movie.id == movieId;
    });
    movieToAddLike[0].likes++;
    res.json(movieToAddLike[0]);
});

// Delete movie
app.delete('/api/movies/delete/:id', (req, res) => {
    let movieId = req.params.id;
    // let movieToRemove = movies.filter(movie => {
    //     return movie.id == movieId;
    // });
    console.log(movieId);
    movies.splice(movieId - 1, 1);
    res.json(movies);
});

// Listen
app.listen(3000, () => {
    movies = loadMovies(moviesPath).then(() => console.log(`Movies file has been read.`));
    users = loadUsers(usersPath).then(() => console.log(`Users file has been read.`));
    console.log("Ready on port 3000");
});