require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mpesaRoutes = require('./routes/mpesa');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/mpesa', mpesaRoutes);

app.get('/', (req, res) => res.send('Second Start Initiative Donation Backend'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
