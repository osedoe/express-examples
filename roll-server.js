const express = require('express');
const app = express();

function rollDice(max) {
    return Math.floor(Math.random() * max + 1);
}

app.get('/roll-dice/:num', (req, res) => {
    const number = req.params.num;
    res.json(`Result: ${rollDice(number)}`);

});

app.listen(3000, () => console.log('Ready on port 3000'));