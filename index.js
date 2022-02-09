import cors from 'cors'

const express = require('express');
const app = express();
const importData = require('./data.json')
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/players", (req, res) => {
    res.send(importData)
})

app.get("/players/:name", (req, res) => {
    const name = importData.find( c => c.name === req.params.name);
    if(!name) res.status(404).send('does not exist');
    res.send(name)
})

app.post("/players", (req, res) => {
    const name = {
        name: req.body.name,
        team: req.body.team,
        pointsPerGame: req.body.pointsPerGame
    };
    importData.push(name);
    res.send(name);

})

app.delete("/players/:name", (req, res) => {
    const name = importData.find( c => c.name === req.params.name);
    if(!name) res.status(404).send('does not exist');

    const deleteName = importData.indexOf(name);
    importData.splice(deleteName, 1)

    res.send(name);
})

app.listen(port, () => {
    console.log(`example listening on http://localhost:${port}`);
});
