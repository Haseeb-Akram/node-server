const express = require('express');
const cors = require('cors');
const path = require('path');
const connectAD = require('./config/ActiveDirectory');
require('dotenv').config();
const app = express();



const username = require("os").userInfo().username
console.log(username);
connectAD.findUser(username, function(err, user) {
    if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
    }

    if (! user) console.log('User: ' + username + ' not found.');
    else console.log(JSON.stringify(user));
});

app.use(cors());
app.use(express.json());


app.get('/', function (req, res) {
    res.json({ntlm: req.ntlm});
})


app.use('/auth', require('./routes/api/auth'))

app.listen(process.env.PORT, () => {
    console.log(`App Listening on port ${process.env.PORT}!`);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/feedback-system/index.html'));
});