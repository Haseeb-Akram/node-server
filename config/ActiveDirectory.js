const ActiveDirectory = require("activedirectory");
require('dotenv').config();


const config = {
    url: process.env.LDAP_URL,
    baseDN: process.env.BASE_DN,
    username: process.env.BIND_DN,
    password: process.env.BIND_CREDENTIALS
}

const connectAD = new ActiveDirectory(config);
module.exports = connectAD;