const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessions = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/feedback-system/index.html')));


app.use('/api', require('./routes/index'))

app.listen(process.env.PORT, () => {
    console.log(`App Listening on port ${process.env.PORT}!`);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/feedback-system/index.html'));
});