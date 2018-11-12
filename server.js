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

// Endpoints
app.get('/api/movies', (req, res) => {
    res.json(movies);
});


app.get("/api/users", (req, res) => {
    // console.log('Request:', req);
    // res.send('Hello World!');
    console.log(req);
    res.json(users);
});

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

app.get('/api/movies/:title', (req, res) => {
    const movieTitle = req.params.title;
    const movie = movies.find(movie => movie.title === movieTitle);
    res.json(movie);
});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id === userId);
    res.json(user);
});

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

app.post("/api/users/:username", (req, res) => {
    const newUser = req.body;
    // console.log(newUser);
    if (!newUser || newUser !== undefined || newUser !== null) {
        res.status(400).send("Debes pasarme algo en el Body");
    } else {

        newUser.id = Math.random();
        newUser.password = Math.random() * 9999 + 1111;
        users.push(newUser);
        res.json(newUser);
    }
});

app.listen(3000, () => {
    movies = loadMovies(moviesPath).then(() => console.log(`Movies file has been read.`));
    users = loadUsers(usersPath).then(() => console.log(`Users file has been read.`));
    console.log("Ready on port 3000");
});

function generateMovieId() {
    let moviesLength = movies.length;
    return moviesLength + 1;
}