const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8085;
const app = express();
app.use(cors());
app.use(express.json());
const DB = process.env.DATABASE_URL;
const mongoose = require('mongoose');
mongoose.connect(`${DB}`, { useNewUrlParser: true, useUnifiedTopology: true });

const getDigimon = require('./controllers/Digimon.controller');
const CRUD = require('./controllers/CRUD.digimon.controller');

app.get('/', (req, res) => { res.send('its working') })

app.get('/digimon', getDigimon);

app.get('/digimon/favourite', CRUD.getFavDigimon);
app.post('/digimon/favourite', CRUD.postData);
app.delete('/digimon/favourite/:slug', CRUD.deleteDigimon);
app.put('/digimon/favourite/:slug', CRUD.updateDigimon);






app.listen(PORT, () => console.log(`The Server On : ${PORT}`))