const express = require('express');
const cors = require('cors');
const path = require('path');
const ntlm = require('express-ntlm');
require('dotenv').config();
const app = express();
const routes = require('./routes/index');
const ActiveDirectory = require('activedirectory');
const LdapStrategy = require('passport-ldapauth');
const passport = require('passport');
// fs = require('fs');
const https = require('https');

app.use(ntlm(
//     {
//     debug: function () {
//         var args = Array.prototype.slice.apply(arguments);
//         console.log.apply(null, args);
//     },
//     domain: 'TECHNO-SOFT',
//     domaincontroller: 'ldap://techno-soft.com',
//     // unauthorized: (req, response, next) => {
//     //     // console.log(req.ntlm.UserName);
//     //     console.log(req.body)
//     //     response.statusCode = 401;
//     //     response.setHeader('WWW-Authenticate', 'NTLM');
//     //     response.end();
//     // },
//     forbidden(req, res) {
//         res
//             .status(401)
//             .send(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${req.url}">`)
//     }
// }
));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/dist/client')));


app.all('/', function (request, response) {
    response.status(200).json({response: JSON.stringify(request.ntlm)});
});

app.get('/post', function (request, response) {
    response.status(200).json({response: JSON.stringify(request.ntlm)});
})

app.listen(process.env.PORT, () => {
    console.log(`App Listening on port ${process.env.PORT}!`);
});
// app.use('/api', routes);
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/dist/client/index.html'));
// });


// const config = {
//     url: 'ldap://TS-DOMAIN-SERVER.techno-soft.com',
//     baseDN: 'OU=TS-Lahore,DC=techno-soft,DC=com',
// };
// const ad = new ActiveDirectory(config);
// const username = 'shahbaz.khawaja@techno-soft.com';
// const password = 'Ts123456!';
// // Authenticate
// ad.authenticate(username, password, function(err, auth) {
//     if (err) {
//         console.log('ERROR: '+JSON.stringify(err));
//         return;
//     }
//     if (auth) {
//         console.log('Authenticated!');
//     }
//     else {
//         console.log('Authentication failed!');
//     }
// });