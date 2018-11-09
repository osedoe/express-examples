const express = require('express');
const app = express();

const users = [{
    id: '1',
    name: 'Pepe'
}, {
    id: '2',
    name: 'Juan'
}];

app.get('/users', (req, res) => {
    // console.log('Request:', req);
    // res.send('Hello World!');
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id === userId);
    res.json(user);
})

app.listen(3000, () => console.log('Ready on port 3000'));