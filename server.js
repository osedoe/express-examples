const express = require("express");
const fs = require('fs');
const app = express();

app.use(express.json());

function readMovies() {

}
fs.readFile('movies.json');

// Endpoints
const users = [{
        id: "1",
        name: "Pepe"
    },
    {
        id: "2",
        name: "Juan"
    }
];

app.get("/users", (req, res) => {
    // console.log('Request:', req);
    // res.send('Hello World!');
    res.json(users);
});

// app.get("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     const user = users.find(user => user.id === userId);
//     res.json(user);
// });

app.post("/users/:username", (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    if (!newUser || newUser !== undefined || newUser !== null) {
        res.status(400).send("Debes pasarme algo en el Body");
    } else {
        newUser.id = Math.random();
        users.push(newUser);
        res.json(newUser);
    }
});

app.listen(3000, () => console.log("Ready on port 3000"));